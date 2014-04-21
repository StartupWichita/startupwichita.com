(function(angular) {
    'use strict';

    var NewsController = [
        '$scope', '$stateParams', '$location', 'Global', 'News',
        function ($scope, $stateParams, $location, Global, News) {
            $scope.global = Global;

            $scope.create = function() {
                var newsItem = new News({
                    title: this.title,
                    content: this.content
                });
                newsItem.$save(function(response) {
                    $location.path('news/' + response._id);
                });

                this.title = '';
                this.content = '';
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
                    $scope.newsItem.$remove();
                    $location.path('news');
                }
            };

            $scope.update = function() {
                var newsItem = $scope.newsItem;
                if (!newsItem.updated) {
                    newsItem.updated = [];
                }
                newsItem.updated.push(new Date().getTime());

                newsItem.$update(function() {
                    $location.path('news/' + newsItem.id);
                });
            };

            $scope.find = function() {
                News.query(function(news) {
                    $scope.news = news;
                });
            };

            $scope.findOne = function() {
                News.get({
                    id: $stateParams.newsItemId
                }, function(newsItem) {
                    $scope.newsItem = newsItem;
                });
            };
        }
    ];

    angular.module('startupwichita.controllers').controller('NewsController', NewsController);
})(window.angular);
