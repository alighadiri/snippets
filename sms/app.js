angular.module('smsApp', ['ui.router', 'ngCookies'])
    .config(['$urlRouterProvider', '$locationProvider', '$httpProvider', function($urlRouterProvider, $locationProvider, $httpProvider) {
        // $httpProvider.defaults.useXDomain = true;
        // delete $httpProvider.defaults.headers.common["X-Requested-With"];
        // $httpProvider.defaults.headers.common["Accept"] = "application/json";
        // $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
        // $locationProvider.html5Mode(true).hashPrefix("!");
        $urlRouterProvider.otherwise('/');
        //$qProvider.errorOnUnhandledRejections(false);
        // $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';


    }])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'main.html',
                controller: 'mainCtrl'
            });

    }])
    .controller('mainCtrl', function($scope, $http, $filter, $timeout, $cookies) {



        $scope.data = {};

        $scope.data.msgFrom = $cookies.get('user');

        if ($cookies.get('isAuth')) {
            $scope.data.isAuth = true;

        } else {
            $scope.data.isAuth = false;
        }


        $scope.data.scrollToBottom = function() {
            $timeout(function() {
                window.scrollTo(0, document.body.scrollHeight);
                console.log($cookies.user);

            }, 100);
        }

        $scope.data.login = function() {
            var req = {
                request: 'login',
                user: $scope.data.user
            };
            $http.post('api.php', req).then(function(res) {
                if (res.data) {
                    $cookies.put('isAuth', true);
                    $cookies.put('user', $scope.data.user);
                    $scope.data.isAuth = true;
                    $scope.data.scrollToBottom();

                } else {
                    $cookies.put('isAuth', false);
                    alert('Fuck Off! This is only for me and my love!');
                }
            });
        }
        $scope.data.sendMsg = function() {

            $scope.data.currentTime = $filter('date')(new Date(), 'yyyy/MM/dd HH:mm');

            var req = {
                table: "messages",
                fields: ["from", "msg", "date"],
                values: [$cookies.get('user') , $scope.data.msgText , $scope.data.currentTime ]
            };

            $http.post('api/AddIt.php', req).then(function(res) {
                console.log(res);
                if (res.data) {
                    $scope.data.getMessages();
                    $scope.data.msgText = '';
                    $scope.data.scrollToBottom();

                }
            });

        }

        $scope.data.getMessages = function() {
            var req = {
                table: 'messages'
            };

            $http.post('api/ReadIt.php', req).then(function(res) {
                console.log(res.data);
                $scope.data.allMessages = res.data;
            });
        }
        $scope.data.getMessages();
        setInterval(function() {
            $scope.data.getMessages();
            $scope.data.scrollToBottom();
        }, 5000);




    });