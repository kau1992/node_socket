var myApp = angular.module('myApp', ['ngRoute']);
myApp.config(function($routeProvider,$locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'pages/login.html',
            controller  : 'loginCtrl'
        })
        .when('/dashboard', {
            templateUrl : 'pages/dashboard.html',
            controller  : 'dashboardCtrl'
        })
        .when('/logout', {
            templateUrl : 'pages/login.html',
            controller  : 'loginCtrl'
        })
        .otherwise({
            templateUrl : 'pages/login.html',
            controller  : 'loginCtrl'
        });
});

myApp.factory('socket', function() {
    var socket = io();
    return socket;
})