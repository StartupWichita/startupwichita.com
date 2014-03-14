(function(angular) {
    'use strict';

    angular.module('startupwichita', [
        'ngCookies',
        'ngResource',
        'ui.bootstrap',
        'ui.router',
        'startupwichita.services',
        'startupwichita.controllers'
    ]);

    angular.module('startupwichita.services', []);
    angular.module('startupwichita.controllers', []);
})(window.angular);
