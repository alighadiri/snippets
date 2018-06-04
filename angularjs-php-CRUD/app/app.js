var app = angular.module("crudApp", []);

app.controller('AppController', function($scope, $http) {

    $scope.read = function() {
        var req = { "table": 'tableName' };
        $http.post('api/read.php', req).then(function(res) {
            console.log(res.data);
        });
    }

    $scope.add = function() {

        var req = {
            "table": 'tableName', // Example : 'myTable'
            "fields": ["field1", "field2", "field3"], // Example : "name" , "phone" , "email"
            "values": [$scope.value1, $scope.value2, $scope.value3] // Example : "Mamo" , "+90123456789" , "yzmamo@email.com"
        }
        $http.post('api/add.php', req).then(function(res) {
            console.log(res.data);
        });
    }

    $scope.delete = function(item) {
        var req = {
            "table": 'tableName', // Example : 'myTable'
            "where": 'fieldName', // Example : 'id'
            "value": item.id // Example : '0123456789'
        }
        $http.post('api/delete.php', req).then(function(res) {
            console.log(res.data);
        });
    }


    $scope.update = function() {
        var req = {
            "table": 'tableName', // Example : 'myTable'
            "where": 'fieldName', // Example : 'id'
            "whereValue": 'fieldValue' // Example : '0123456789'
            "fields": ["field1", "field2"], // Example : "name" , "phone"
            "values": [[$scope.value1, $scope.value2] // Example : "Mamo" , "+90123456789" 
        }
        $http.post('api/update.php', req).then(function(res) {
            console.log(res.data);
        });

    }
});