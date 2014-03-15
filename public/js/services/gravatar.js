(function(angular, CryptoJS) {
    'use strict';

    // Gets the image associated with a gravatar email address
    var GravatarService = [
        function () {
            return {
                buildGravatarUrl: function (email, size) {
                    var defaultUrl = 'http://www.gravatar.com/avatar/0.jpg?s=' + size,
                        emailRegEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                    if (emailRegEx.test(email) === false) {
                        return defaultUrl;
                    }

                    return 'http://www.gravatar.com/avatar/' + CryptoJS.MD5(email) + '.jpg?s=' + size + '&r=g';
                }
            };
        }
    ];

    angular.module('startupwichita.services').factory('Gravatar', GravatarService);
})(window.angular, window.CryptoJS);
