(function(angular) {
    'use strict';

    // Gets the image associated with an MD5 hash of a gravatar email address
    var GravatarService = [
        function () {
            return {
                buildGravatarUrl: function (emailHash, size) {
                    return 'http://www.gravatar.com/avatar/' + emailHash + '.jpg?s=' + size + '&r=g';
                }
            };
        }
    ];

    angular.module('startupwichita.services').factory('Gravatar', GravatarService);
})(window.angular);
