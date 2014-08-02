(function(angular) {
    'use strict';

    var UsersController = [
        '$scope', '$stateParams', '$location', 'Global', 'Users', 'Gravatar',
        function ($scope, $stateParams, $location, Global, Users, Gravatar) {
            $scope.global = Global;
            $scope.gravatar = Gravatar;

            $scope.update = function() {
                var user = $scope.user;

                user.$update(function() {
                    $location.path('/api/v1/users/' + user._id);
                });
            };

            $scope.find = function() {
                Users.query(function(users) {
                    $scope.users = users;
                });
            };

            $scope.findOne = function() {
                Users.get({
                    _id: $stateParams.userId
                }, function(user) {
                    $scope.user = user;
                });
            };
        }
    ];

    angular.module('startupwichita.controllers').controller('UsersController', UsersController);
})(window.angular);
