(function(angular) {
    'use strict';

    var UsersController = [
        '$scope', '$stateParams', '$location', 'Global', 'Users', 'Gravatar',
        function ($scope, $stateParams, $location, Global, Users, Gravatar) {
            $scope.global = Global;
            $scope.gravatar = Gravatar;
            $scope.errors = [];

            $scope.signin = function() {
                var user = new Users({
                    email: this.email,
                    password: this.password
                });

                user.$signin(function() {
                    // We use window.location instead of $location to get a
                    // full refresh.  This is required to show the user as
                    // logged in.
                    window.location.href = '/';
                }, function () {
                    $scope.errors = ['That email address could not be found, or the password is incorrect.'];
                });
            };

            $scope.create = function() {
                var user = new Users({
                    name: this.name,
                    email: this.email,
                    username: this.username,
                    password: this.password
                });

                user.$save(function() {
                    // We use window.location instead of $location to get a
                    // full refresh.  This is required to show the user as
                    // logged in.
                    window.location.href = '/';
                }, function (response) {
                    $scope.errors = response.data.errors;
                });
            };

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
