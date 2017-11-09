 $(function() {
   $('#about').froalaEditor({
     toolbarButtons: ['undo', 'redo', 'bold', 'italic', 'align', 'insertLink'],
     quickInsertTags: ['']

   })
 });


 var generatorApp = angular.module('generatorApp', []);





 generatorApp.controller('mainCtrl', function($scope, $http, fileReader, $timeout) {

   $scope.getFile = function() {
     fileReader.readAsDataUrl($scope.file, $scope)
       .then(function(result) {
         $scope.logo = result;
       });
   };


   $scope.buildHeader = function() {
     $('.headerz').remove();
     $http.get('/header.html').then(
       function(res) {
         var header = res.data;

         $scope.template = header.toString().replace(/:logo/g, $scope.logo).replace(/:company/g, $scope.company);
         angular.element('body').append('<div style="width:600px; float:left;" class="headerz">' + $scope.template + '</div>');
       }
     );
   }
   $scope.generateHeader = function() {
     html2canvas($('.headerz'), {
       onrendered: function(canvas) {
         var theCanvas = canvas;
         var b64Text = theCanvas.toDataURL('image/png', 1.0);
         $scope.header64 = b64Text;
       }
     });
   }



   $scope.buildListing = function() {
     $('.listing').remove();
     $http.get('/listing.html').then(
       function(res) {
         var header = res.data;

         $scope.listing = header.toString().replace(/:jobtitle/g, $scope.jobTitle).replace(/:business/g, $scope.businessName).replace(/:location/g, $scope.location).replace(/:salary/g, $scope.salary);
         angular.element('body').append('<div style="width:390px; float:left;" class="listing">' + $scope.listing + '</div>');
       }
     );
   }
   $scope.generateListing = function() {
     html2canvas($('.listing'), {
       onrendered: function(canvas) {
         var theCanvas = canvas;
         var b64Text = theCanvas.toDataURL('image/jpg', 1.0);
         $scope.listing64 = b64Text;
       }
     });
   }
   $scope.generateBenefits = function() {

     angular.element('body').append('<div class="benefits"></div>');
     angular.forEach($scope.benefits, function(value, key) {
       if (value == 'Company trips') { var icon = 'https://marketing-image-production.s3.amazonaws.com/uploads/934df7504830725372273e970832d6e1da6cac56a4a88f41aada3ec54fd993a3230d4d73d29fd1ab0d3d5c88b8cbb88e4fb8947516eac1a273d47084cfc376d0.png'; }
       if (value == 'Gym/fitness') { var icon = 'https://marketing-image-production.s3.amazonaws.com/uploads/8d489dfa36f4c7d93c6bd046deda8aa9eb1d34452eb43ec7d31ceacb12f21494a9a3d5a2cd551cd8b5403610743c91f0430314b9553a7f857c77c855343df687.png'; }
       if (value == 'Medical insurance') { var icon = 'https://marketing-image-production.s3.amazonaws.com/uploads/68b255760ddc0039329d425fa8e16db3a4f31dd1dba554a0590159b899850f65bda1eccd086daa4172965e40b347d83c8b16b593ca305146eb92389e1f6a48c3.png'; }
       if (value == 'Parking allowance') { var icon = 'https://marketing-image-production.s3.amazonaws.com/uploads/face929319732d297a006498dad387604967c357d2a507b3312cb2ecf45e19266ea7adb9b3cdbd78c3fac7c5b884b0f7d9d852ffaca9feaa09b85b25e3a37184.png'; }
       if (value == 'Pension scheme') { var icon = 'https://marketing-image-production.s3.amazonaws.com/uploads/4ecc2e9753b2e0aa15fd312676d9042136d00870fb6d49f247ca7be33dbe72785aa2178d6be738cf9efff1b2931c3aa1d705fcb722f7ef8fbad61691540575ce.png'; }
       if (value == 'Team building activities') { var icon = 'https://marketing-image-production.s3.amazonaws.com/uploads/3bed38f9936c6094eae418a654dcbd1bce688cf1b707deb128a74a02c35b47e83383d5996eae331aac4b43b866432bac5d28ee49127ef44d9b55e6c994c5de64.png'; }
       if (value == 'Training') { var icon = 'https://marketing-image-production.s3.amazonaws.com/uploads/7ab61afd7fbbcb8a30ff88cecdf2458ecfcce1dea22b9d888e5c0bc7feeabac78837dd1487a875faeb4578de0b31e99bce4f0a70ca9793802fa4cc9ba76b14bc.png'; }
       angular.element('.benefits').append('<tr><td style="width:35%; text-align:right;"><img width="40" height="40" src="'+ icon +'"/></td><td style="width:65%;"><span style="text-transform:capitalize; line-height:22px;font-family:verdana; font-size:16px; color:#777;">' + value + '</span></td></tr>');
     });

   }


   $scope.saveFile = function() {
     $timeout(function() {
       $scope.buildHeader();
       $scope.buildListing();
       $scope.generateBenefits();

     }, 1000);
     $timeout(function() {
       $scope.generateHeader();
       $scope.generateListing();

     }, 2000);
     $timeout(function() {

       $http.get('/template.html').then(
         function(res) {

           $scope.template = res.data;
           var about = angular.element('#about').val();
           var benefits = angular.element('.benefits').html();
           $scope.template = $scope.template.replace(':benefits', benefits).replace(':jobcard', $scope.listing64).replace(':topimg', $scope.header64).replace(/:joburl/g, $scope.jobUrl).replace(/:about/g, about).replace(/:logoShadow/g, $scope.logo);
           var blob = new Blob([$scope.template]);
           var downloadLink = angular.element('#saveFile');
           downloadLink.attr('href', window.URL.createObjectURL(blob));
           downloadLink.attr('download', $scope.company + '.html');
           downloadLink[0].click();

         }

       );
     }, 3000);



   };


 });




 generatorApp.directive('ngFileSelect', function() {

   return {
     link: function($scope, el) {

       el.bind('change', function(e) {

         $scope.file = (e.srcElement || e.target).files[0];
         $scope.getFile();
       })

     }

   }


 })


 var fileReader = function($q, $log) {

   var onLoad = function(reader, deferred, scope) {
     return function() {
       scope.$apply(function() {
         deferred.resolve(reader.result);
       });
     };
   };

   var onError = function(reader, deferred, scope) {
     return function() {
       scope.$apply(function() {
         deferred.reject(reader.result);
       });
     };
   };

   var onProgress = function(reader, scope) {
     return function(event) {
       scope.$broadcast('fileProgress', {
         total: event.total,
         loaded: event.loaded
       });
     };
   };

   var getReader = function(deferred, scope) {
     var reader = new FileReader();
     reader.onload = onLoad(reader, deferred, scope);
     reader.onerror = onError(reader, deferred, scope);
     reader.onprogress = onProgress(reader, scope);
     return reader;
   };

   var readAsDataURL = function(file, scope) {
     var deferred = $q.defer();

     var reader = getReader(deferred, scope);
     reader.readAsDataURL(file);

     return deferred.promise;
   };

   return {
     readAsDataUrl: readAsDataURL
   };
 };

 generatorApp.factory('fileReader', ['$q', '$log', fileReader]);
