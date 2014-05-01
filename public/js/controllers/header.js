(function(angular) {
    'use strict';

    var HeaderController = [
        '$scope', 'Global',
        function ($scope, Global) {
            $scope.global = Global;

            // TODO do we need any of this if the menu is just static???
            $scope.menu = [{
                'title': 'News',
                'link': 'news'
            }];

            $scope.isCollapsed = false;
        }
    ];

    angular.module('startupwichita.controllers').controller('HeaderController', HeaderController);
})(window.angular);
