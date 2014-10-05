(function(angular) {
    'use strict';

    var NewsController = [
        '$scope', '$stateParams', '$location', 'Global', 'News', 'Tags',
        function ($scope, $stateParams, $location, Global, News, Tags) {
            $scope.tagOptions = Tags.query();

            $scope.global = Global;
            $scope.newNews = {};

            $scope.create = function() {
                var newsItem = new News({
                    title: $scope.newNews.title,
                    content: $scope.newNews.content,
                    url: $scope.newNews.url,
                    tags: $scope.newNews.tags,
                    author: $scope.global.user._id
                });

                newsItem.$save().then(function(response) {
                    $location.path('news/' + response._id);
                }, function (response) {
                    $scope.errors = response.data.errors;
                });
            };

            $scope.remove = function(newsItem) {
                newsItem.$remove(function () {
                    $location.path('news');
                }, function (response) {
                    $scope.errors = response.data.errors;
                });
            };

            $scope.update = function() {
                var newsItem = $scope.newsItem;
                if (!newsItem.updated) {
                    newsItem.updated = [];
                }
                newsItem.updated.push(new Date().getTime());

                newsItem.$update().then(function() {
                    $location.path('news/' + newsItem._id);
                }, function (response) {
                    $scope.errors = response.data.errors;
                });
            };

            $scope.find = function() {
                News.query(function(news) {
                    $scope.news = news;
                });
            };

            $scope.findOne = function() {
                $scope.newsItem = {};

                News.get({
                    _id: $stateParams.newsItemId
                }, function(newsItem) {
                    $scope.newsItem = newsItem;
                });
            };

            $scope.spam = function(newsItem) {
                newsItem.$spam(function () {
                    $location.path('news');
                }, function (response) {
                    $scope.errors = response.data.errors;
                });
            };
        }
    ];

    angular.module('startupwichita.controllers').controller('NewsController', NewsController);
})(window.angular);
