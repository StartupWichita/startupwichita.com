'use strict';

(function() {
    describe('startupwichita controllers', function() {
        describe('IndexController', function() {
            // Load the controllers module
            beforeEach(module('startupwichita'));

            var scope, IndexController, $httpBackend, peopleData;

            peopleData = [
                {
                    "name": "Seth Etter",
                    "email": "sethetter@gmail.com",
                    "featured": true,
                    "tagline": "JavaScript Dude",
                },
                {
                    "name": "Jacob Walker",
                    "email": "jacobwalker0814@gmail.com",
                    "featured": true,
                    "tagline": "PHP Dude",
                },
                {
                    "name": "Jonathan Van Winkle",
                    "email": "jonathan.vanwinkle@gmail.com",
                    "featured": true,
                    "tagline": "Design Dude",
                },
                {
                    "name": "Jim Rice",
                    "email": "hitjim@gmail.com",
                    "featured": true,
                    "tagline": "Growler Dude",
                },
                {
                    "name": "Kenton Hansen",
                    "email": "kenton@gobananago.com",
                    "featured": true,
                    "tagline": "Startup Dude",
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
                $httpBackend.expectGET('/api/v1/users').respond(peopleData);

                scope.getFeaturedUsers();
                $httpBackend.flush();

                expect(scope.featuredUsers).toEqual(peopleData);
            });

        });
    });
})();
