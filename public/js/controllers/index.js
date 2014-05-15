(function(angular) {
    'use strict';

    var IndexController = [
        '$scope', '$timeout', 'Global', 'Users', 'Gravatar',
        function ($scope, $timeout, Global, Users, Gravatar) {
            $scope.global = Global;
            $scope.gravatar = Gravatar;

            $scope.peopleReady = false;
            $scope.newsReady = false;
            $scope.resourcesReady = false;

            $scope.init = function() {
                $scope.getFeaturedUsers();
            };

            $scope.getFeaturedUsers = function() {
                Users.query({ featured: true }, function(users) {
                    $scope.featuredUsers = users;

                    // This makes sure that the flag gets flipped on the
                    // next iteration of the event loop, so that the DOM
                    // has all the slides inserted before applying the
                    // slider directive to it.

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
