(function(angular) {
    'use strict';

    var HeaderController = [
        '$scope', 'Global',
        function ($scope, Global) {
            $scope.global = Global;

            $scope.menu = [{
                'title': 'Articles',
                'link': 'articles'
            }, {
                'title': 'Create New Article',
                'link': 'articles/create'
            }];

            $scope.isCollapsed = false;
        }
    ];

    angular.module('startupwichita.controllers').controller('HeaderController', HeaderController);
})(window.angular);
