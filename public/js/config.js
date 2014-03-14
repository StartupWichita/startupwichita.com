(function(angular) {
    'use strict';

    //Setting up route
    var RouteProvider = [
        '$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            // For unmatched routes:
            $urlRouterProvider.otherwise('/');

            // states for my app
            $stateProvider
                .state('all articles', {
                    url: '/articles',
                    templateUrl: 'views/articles/list.html'
                })
                .state('create article', {
                    url: '/articles/create',
                    templateUrl: 'views/articles/create.html'
                })
                .state('edit article', {
                    url: '/articles/:articleId/edit',
                    templateUrl: 'views/articles/edit.html'
                })
                .state('article by id', {
                    url: '/articles/:articleId',
                    templateUrl: 'views/articles/view.html'
                })
                .state('home', {
                    url: '/',
                    templateUrl: 'views/index.html'
                });
        }
    ];

    //Setting HTML5 Location Mode
    var LocationProvider = [
        '$locationProvider',
        function($locationProvider) {
            $locationProvider.hashPrefix('!');
        }
    ];

    angular.module('startupwichita')
        .config(RouteProvider)
        .config(LocationProvider);
})(window.angular);
