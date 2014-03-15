(function(angular) {
    'use strict';

    // Startup Resources service used for resources REST endpoint
    var resourcesFactory = [
        '$resource',
        function($resource) {
            return $resource('/api/v1/resources/:id', {
                id: '@_id'
            }, {
                update: {
                    method: 'PUT'
                },
                search: {
                    method: 'GET',
                    isArray: true
                }
            });
        }
    ];

    angular.module('startupwichita.services').factory('Resources', resourcesFactory);
})(window.angular);
