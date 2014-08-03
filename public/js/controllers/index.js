(function(angular) {
    'use strict';

    var IndexController = [
        '$scope', '$timeout', 'Global', 'Users', 'Gravatar', 'News', 'Resources', 'Events',
        function ($scope, $timeout, Global, Users, Gravatar, News, Resources, Events) {
            $scope.global = Global;
            $scope.gravatar = Gravatar;

            $scope.peopleReady = false;
            $scope.newsReady = false;
            $scope.resourcesReady = false;

            $scope.init = function() {
                $scope.getFeaturedUsers();
                $scope.getFeaturedNews();
                $scope.getFeaturedResources();
                $scope.getFeaturedEvents();
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

                });
            };

            $scope.getFeaturedEvents = function() {
                Events.query({}, function(events) {
                    $scope.firstTwoEvents = events.slice(0, 2);
                    $scope.featuredEvents = events.slice(2, 6);
                });
            };

            $scope.getFeaturedNews = function() {
                News.query({}, function(news) {
                    $scope.featuredNews = news;

                    $timeout(function() {
                        $scope.newsReady = true;
                    }, 0);
                });
            };

            $scope.getFeaturedResources = function() {
                // TODO: should this query for "featured" resources?
                Resources.query({}, function(resources) {
                    $scope.featuredResources = resources;

                    $timeout(function() {
                        $scope.resourcesReady = true;
                    }, 0);
                });
            };
        }
    ];

    angular.module('startupwichita.controllers').controller('IndexController', IndexController);
})(window.angular);
