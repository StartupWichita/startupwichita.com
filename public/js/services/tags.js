(function(angular) {
    'use strict';

    // Tags service used for articles REST endpoint
    var TagsService = [
        '$resource',
        function($resource) {
            return $resource('/api/v1/tags/:id', {id: '@id'}, {
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

    angular.module('startupwichita.services').factory('Tags', TagsService);
})(window.angular);
