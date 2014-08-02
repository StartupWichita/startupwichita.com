(function(angular) {
    'use strict';

    var NewsController = [
        '$scope', '$stateParams', '$location', 'Global', 'News',
        function ($scope, $stateParams, $location, Global, News) {
            $scope.global = Global;

            $scope.create = function() {
                var newsItem = new News({
                    title: this.title,
                    content: this.content,
                    url: this.url,
                    author: $scope.global.user._id
                });

                newsItem.$save().then(function(response) {
                    $location.path('news/' + response._id);
                }, function () {
                    // TODO [cah] Need to show validation errors
                });
            };

            $scope.remove = function(newsItem) {
                if (newsItem) {
                    newsItem.$remove();

                    for (var i in $scope.news) {
                        if ($scope.news[i] === newsItem) {
                            $scope.news.splice(i, 1);
                        }
                    }
                }
                else {
                    $scope.currentItem.$remove();
                    $location.path('news');
                }
            };

            $scope.update = function() {
                var newsItem = $scope.currentItem;
                if (!newsItem.updated) {
                    newsItem.updated = [];
                }
                newsItem.updated.push(new Date().getTime());

                newsItem.$update().then(function() {
                    $location.path('news/' + newsItem._id);
                }, function () {
                    // TODO [cah] Handle errors
                });
            };

            $scope.find = function() {
                News.query(function(news) {
                    $scope.news = news;
                });
            };

            $scope.findOne = function() {
                News.get({
                    _id: $stateParams.newsItemId
                }, function(newsItem) {
                    $scope.currentItem = newsItem;
                });
            };
        }
    ];

    angular.module('startupwichita.controllers').controller('NewsController', NewsController);
})(window.angular);
