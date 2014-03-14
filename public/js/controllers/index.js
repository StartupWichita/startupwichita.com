(function(angular) {
    'use strict';

    var IndexController = [
        '$scope', 'Global',
        function ($scope, Global) {
            $scope.global = Global;
        }
    ];

    angular.module('startupwichita.controllers').controller('IndexController', IndexController);
})(window.angular);
