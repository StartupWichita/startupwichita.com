(function(angular) {
    'use strict';

    // News service used for news REST endpoint
    var NewsService = [
        '$resource',
        function($resource) {
            return $resource('/api/v1/news/:_id', {_id: '@_id'},
                {
                    update: {
                        method: 'PUT'
                    },
                    search: {
                        method: 'GET',
                        isArray: true

                    },
                    spam: {
                        method: 'PUT',
                        url: '/api/v1/news/:_id/spam'
                    }
                }
            );
        }
    ];

    angular.module('startupwichita.services').factory('News', NewsService);
})(window.angular);
