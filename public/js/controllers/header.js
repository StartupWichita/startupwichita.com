(function(angular) {
    'use strict';

    var HeaderController = [
        '$scope', 'Global',
        function ($scope, Global) {
            $scope.global = Global;
        }
    ];

    angular.module('startupwichita.controllers').controller('HeaderController', HeaderController);
})(window.angular);
