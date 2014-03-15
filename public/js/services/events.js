(function(angular) {
    'use strict';

    // Events service used for events REST endpoint
    var EventsService = [
        '$resource',
        function($resource) {
            return $resource('/api/v1/events/:id', {
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

    angular.module('startupwichita.services').factory('Events', EventsService);
})(window.angular);
