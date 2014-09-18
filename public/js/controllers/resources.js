(function(angular) {
    'use strict';

    var ResourcesController = [
        '$scope', '$stateParams', '$location', 'Global', 'Resources',
        function ($scope, $stateParams, $location, Global, Resources) {
            $scope.global = Global;

            $scope.create = function() {
                var resource = new Resources({
                    title: this.title,
                    content: this.content,
                    tags: this.tags,
                    url: this.url,
                    image: this.image
                });
                resource.$save(function(response) {
                    $location.path('resources/' + response._id);
                }, function () {
                    // TODO Need to show validation errors
                });
            };

            $scope.remove = function(resource) {
                resource.$remove(null, function () {
                    $location.path('resources');
                });
            };

            $scope.update = function() {
                var resource = $scope.resource;

                resource.$update(function() {
                    $location.path('resources/' + resource._id);
                }, function () {
                    // TODO Need to show validation errors
                });
            };

            $scope.find = function() {
                Resources.query(function(resources) {
                    $scope.resources = resources;
                });
            };

            $scope.findOne = function() {
                Resources.get({
                    _id: $stateParams.resourceId
                }, function(resource) {
                    $scope.resource = resource;
                });
            };
        }
    ];

    angular.module('startupwichita.controllers').controller('ResourcesController', ResourcesController);
})(window.angular);
