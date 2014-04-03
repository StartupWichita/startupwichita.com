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
                });

                this.title   = '';
                this.content = '';
                this.tags    = '';
                this.url     = '';
                this.image   = '';
            };

            $scope.remove = function(resource) {
                if (resource) {
                    resource.$remove();

                    for (var i in $scope.resources) {
                        if ($scope.resources[i] === resource) {
                            $scope.resources.splice(i, 1);
                        }
                    }
                } else {
                    $scope.resource.$remove();
                }

                $location.path('resources');
            };

            $scope.update = function() {
                var resource = $scope.resource;
                if (!resource.updated_at) {
                    resource.updated_at = [];
                }
                resource.updated_at.push(new Date().getTime());

                resource.$update(function() {
                    $location.path('resources/' + resource._id);
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
