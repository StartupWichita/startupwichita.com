(function(angular) {
    'use strict';

    var IndexController = [
        '$scope', '$timeout', 'Global', '$http', 'Gravatar',
        function ($scope, $timeout, Global, $http, Gravatar) {
            $scope.global = Global;
            $scope.gravatar = Gravatar;

            $scope.peopleReady = false;

            $scope.init = function() {
                $scope.getFeaturedUsers();
            };

            // This makes sure that the flag gets flipped on the
            // next iteration of the event loop, so that the DOM
            // has all the slides inserted before applying the
            // slider directive to it.

            $scope.getFeaturedUsers = function() {
                $http.get('/api/v1/users?featured=true').then(function(response) {
                    $scope.featuredUsers = response.data;

                    $timeout(function() {
                        $scope.peopleReady = true;
                    }, 0);

                }, function(err) {
                    console.log(err);
                });
            };
        }
    ];

    angular.module('startupwichita.controllers').controller('IndexController', IndexController);
})(window.angular);
