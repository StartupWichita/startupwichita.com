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
                .state('signin', {
                    url: '/signin',
                    templateUrl: 'views/users/signin.html'
                })
                .state('signup', {
                    url: '/signup',
                    templateUrl: 'views/users/signup.html'
                })
                .state('all events', {
                    url: '/events',
                    templateUrl: 'views/events/list.html'
                })
                .state('create event', {
                    url: '/events/create',
                    templateUrl: 'views/events/create.html',
                    data: {
                        authorization: {
                            required: true
                        }
                    }
                })
                .state('edit event', {
                    url: '/events/:eventId/edit',
                    templateUrl: 'views/events/edit.html',
                    data: {
                        authorization: {
                            required: true
                        }
                    }
                })
                .state('event by id', {
                    url: '/events/:eventId',
                    templateUrl: 'views/events/view.html'
                })
                .state('all news', {
                    url: '/news',
                    templateUrl: 'views/news/list.html'
                })
                .state('create news item', {
                    url: '/news/create',
                    templateUrl: 'views/news/create.html'
                })
                .state('edit news item', {
                    url: '/news/:newsItemId/edit',
                    templateUrl: 'views/news/edit.html'
                })
                .state('news item by id', {
                    url: '/news/:newsItemId',
                    templateUrl: 'views/news/view.html'
                })
                .state('all users', {
                    url: '/users',
                    templateUrl: 'views/users/list.html'
                })
                .state('user by id', {
                    url: '/users/:userId',
                    templateUrl: 'views/users/view.html'
                })
                .state('edit user', {
                    url: '/users/:userId/edit',
                    templateUrl: 'views/users/edit.html'
                })
                .state('all resources', {
                    url: '/resources',
                    templateUrl: 'views/resources/list.html'
                })
                .state('create resource', {
                    url: '/resources/create',
                    templateUrl: 'views/resources/create.html',
                    data: {
                        authorization: {
                            required: true
                        }
                    }
                })
                .state('edit resource', {
                    url: '/resources/:resourceId/edit',
                    templateUrl: 'views/resources/edit.html',
                    data: {
                        authorization: {
                            required: true
                        }
                    }
                })
                .state('resource by id', {
                    url: '/resources/:resourceId',
                    templateUrl: 'views/resources/view.html'
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

    var AuthenticatedRouteProvider = [
        '$rootScope', '$window', 'Global',
        function ($rootScope, $window, Global) {
            $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
                if (toState.data != null && toState.data.authorization != null) {
                    var authRequired = toState.data.authorization.required,
                        returnUrl = '';

                    if (authRequired && !Global.authenticated) {
                        event.preventDefault();
                        returnUrl = toState.url;
                        _.forEach(toStateParams, function (value, key) {
                            returnUrl = returnUrl.replace(':' + key, value);
                        });

                        // now, send them to the signin state so they can log in
                        $window.location = '/#!/signin?returnUrl=' + returnUrl;
                    }
                }
            });
        }
    ];

    angular.module('startupwichita')
        .config(RouteProvider)
        .config(LocationProvider)
        .run(AuthenticatedRouteProvider);
})(window.angular);
