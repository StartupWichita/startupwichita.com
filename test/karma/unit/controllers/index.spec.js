'use strict';

(function() {
    describe('startupwichita controllers', function() {
        describe('IndexController', function() {
            // Load the controllers module
            beforeEach(module('startupwichita'));

            var scope, IndexController, $httpBackend,
                peopleData, topicData;

            peopleData = [
                {
                    'name': 'Seth Etter',
                    'emailHash': '98ausdp9f8jap98djfasdf',
                    'featured': true,
                    'tagline': 'JavaScript Dude',
                },
                {
                    'name': 'Jacob Walker',
                    'emailHash': '98ausdp9f8jap98djfasdf',
                    'featured': true,
                    'tagline': 'PHP Dude',
                }
            ];

            topicData = [
                {
                    'title': 'Topic Item 1',
                    'content': 'Yada yada stuff and more stuff'
                },
                {
                    'title': 'Topic Item 2',
                    'content': 'Yada yada stuff and more stuff'
                }
            ];

            beforeEach(inject(function($controller, $rootScope, _$httpBackend_) {
                scope = $rootScope.$new();

                $httpBackend = _$httpBackend_;

                IndexController = $controller('IndexController', {
                    $scope: scope
                });
            }));

            it('should expose some global scope', function() {
                expect(scope.global).toBeTruthy();
            });

            it('should expose the Gravatar service', function() {
                expect(scope.gravatar).toBeTruthy();
            });

            it('should have featured people', function() {
                $httpBackend.expectGET('/api/v1/users?featured=true').respond(peopleData);

                scope.getFeaturedUsers();
                $httpBackend.flush();

                expect(scope.featuredUsers[0].name).toEqual(peopleData[0].name);
                expect(scope.featuredUsers[1].name).toEqual(peopleData[1].name);
            });

            it('should have news items', function() {
                $httpBackend.expectGET('/api/v1/news').respond(topicData);

                scope.getFeaturedNews();
                $httpBackend.flush();

                expect(scope.featuredNews[0].title).toEqual(topicData[0].title);
                expect(scope.featuredNews[1].title).toEqual(topicData[1].title);
            });

            it('should have featured resources', function() {
                $httpBackend.expectGET('/api/v1/resources').respond(topicData);

                scope.getFeaturedResources();
                $httpBackend.flush();

                expect(scope.featuredResources[0].title).toEqual(topicData[0].title);
                expect(scope.featuredResources[1].title).toEqual(topicData[1].title);
            });

        });
    });
})();
