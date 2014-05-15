'use strict';

(function() {
    describe('startupwichita controllers', function() {
        describe('IndexController', function() {
            // Load the controllers module
            beforeEach(module('startupwichita'));

            var scope, IndexController, $httpBackend, peopleData;

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
                },
                {
                    'name': 'Jonathan Van Winkle',
                    'emailHash': '98ausdp9f8jap98djfasdf',
                    'featured': true,
                    'tagline': 'Design Dude',
                },
                {
                    'name': 'Jim Rice',
                    'emailHash': '98ausdp9f8jap98djfasdf',
                    'featured': true,
                    'tagline': 'Growler Dude',
                },
                {
                    'name': 'Kenton Hansen',
                    'emailHash': '98ausdp9f8jap98djfasdf',
                    'featured': true,
                    'tagline': 'Startup Dude',
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
                expect(scope.featuredUsers[2].name).toEqual(peopleData[2].name);
            });

        });
    });
})();
