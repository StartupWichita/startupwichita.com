(function(angular) {
    'use strict';

    var HeaderController = [
        '$scope', 'Global',
        function ($scope, Global) {
            $scope.global = Global;
            $scope.isCollapsed = true;
        }
    ];

    angular.module('startupwichita.controllers').controller('HeaderController', HeaderController);
})(window.angular);
