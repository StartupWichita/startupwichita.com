(function(angular) {
    'use strict';

    // Users service used for users REST endpoint
    var UserService = [
        '$resource',
        function($resource) {
            return $resource('/api/v1/users/:_id', {_id: '@_id'},
                {
                    update: {
                        method: 'PUT'
                    },
                    search: {
                        method: 'GET',
                        isArray: true
                    },
                    signin: {
                        method: 'POST',
                        url: '/users/session'
                    }
                }
            );
        }
    ];

    angular.module('startupwichita.services').factory('Users', UserService);
})(window.angular);
