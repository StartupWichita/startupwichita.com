(function(angular) {
    'use strict';

    // Articles service used for articles REST endpoint
    var ArticlesFactory = [
        '$resource',
        function($resource) {
            return $resource('articles/:articleId', {
                articleId: '@_id'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }
    ];

    angular.module('startupwichita.services').factory('Articles', ArticlesFactory);
})(window.angular);
