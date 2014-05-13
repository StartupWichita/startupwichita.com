(function(angular, _) {
    'use strict';

    var TagsController = [
        '$scope', '$stateParams', '$location', 'Global', 'Tags',
        function ($scope, $stateParams, $location, Global, Tags) {
            $scope.global = Global;
            $scope.tags = [];
            $scope.name = '';
            $scope.primary = false;

            $scope.create = function() {
                var tag = new Tags({
                    name: $scope.name,
                    primary: $scope.primary
                });

                tag.$save(function(response) {
                    $scope.tags.push(response);
                });

                $scope.name = '';
                $scope.primary = false;
            };

            $scope.remove = function(tag) {
                var deleteTag = tag || $scope.tag;

                Tags.remove({_id: deleteTag._id}, function() {
                    $scope.tags = _.filter($scope.tags, function (value) {
                        return value !== deleteTag;
                    });
                });
            };

            $scope.update = function(tag) {
                var updateTag = tag || $scope.tag;

                updateTag.$update(function(response) {
                    _.forEach($scope.tags, function (value, index) {
                        if (value._id === response._id) {
                            $scope.tags[index] = response;

                            return false;
                        }

                        return true;
                    });
                });
            };

            $scope.find = function() {
                Tags.query(function(tags) {
                    $scope.tags = tags;
                });
            };

            $scope.findOne = function() {
                Tags.get({_id: $stateParams._id}, function(tag) {
                    $scope.tag = tag;
                });
            };
        }
    ];

    angular.module('startupwichita.controllers').controller('TagsController', TagsController);
})(window.angular, window._);
