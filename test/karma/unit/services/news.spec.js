(function() {
    'use strict';

    // News Controller Spec
    describe('startupwichita services', function () {
        // Load the startupwichita module
        beforeEach(module('startupwichita'));

        describe('newsService', function () {
            it ('should issue PUT request to /api/v1/news/:_id', inject(function(News, $httpBackend) {
                var newsItemId = '507f1f77bcf86cd799439011',
                    updateNews,
                    updateTimestamp = Date.now();

                $httpBackend.expectPUT('/api/v1/news/' + newsItemId).respond({_id: newsItemId, name: 'News 1', updated: updateTimestamp});

                updateNews = new News({
                    _id: newsItemId,
                    name: 'News 1'
                });

                updateNews.$update();

                $httpBackend.flush();
                expect(updateNews._id).toEqual(newsItemId);
                expect(updateNews.name).toEqual('News 1');
                expect(updateNews.updated).toEqual(updateTimestamp);
            }));
        });

        describe('newsService', function () {
            it ('should issue GET request to /api/v1/news?search=news', inject(function(News, $httpBackend) {
                $httpBackend.when('GET', '/api/v1/news?search=news').respond([
                    {_id: '507f1f77bcf86cd799439011', name: 'News 1'},
                    {_id: '507f1f77bcf86cd799439012', name: 'News 2'}
                ]);

                var news = News.search({search: 'news'});

                $httpBackend.flush();
                expect(news[0]._id).toEqual('507f1f77bcf86cd799439011');
                expect(news[0].name).toEqual('News 1');
            }));
        });
    });
})();
