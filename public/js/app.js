(function(angular) {
    'use strict';

    angular.module('startupwichita', [
        'ngCookies',
        'ngResource',
        'ngStorage',
        'ui.bootstrap',
        'ui.router',
        'startupwichita.services',
        'startupwichita.controllers',
        'startupwichita.directives'
    ]);

    angular.module('startupwichita.services', []);
    angular.module('startupwichita.controllers', []);
    angular.module('startupwichita.directives', []);
})(window.angular);
