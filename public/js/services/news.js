(function(angular) {
    'use strict';

    // News service used for articles REST endpoint
    var NewsService = [
        '$resource',
        function($resource) {
            return $resource('/api/v1/news/:id', {id: '@id'},
                {
                    update: {
                        method: 'PUT'
                    },
                    search: {
                        method: 'GET',
                        isArray: true
                    }
                }
            );
        }
    ];

    angular.module('startupwichita.services').factory('News', NewsService);
})(window.angular);
