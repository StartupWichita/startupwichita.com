(function(angular) {
    'use strict';

    angular.module('startupwichita', [
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngStorage',
        'ui.bootstrap',
        'ui.router',
        'startupwichita.services',
        'startupwichita.controllers',
        'startupwichita.directives',
        'startupwichita.filters'
    ]);

    angular.module('startupwichita.services', []);
    angular.module('startupwichita.controllers', []);
    angular.module('startupwichita.directives', []);
    angular.module('startupwichita.filters', []);
})(window.angular);
