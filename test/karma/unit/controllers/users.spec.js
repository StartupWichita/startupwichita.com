'use strict';

(function() {
    // Users Controller Spec
    describe('startupwichita controllers', function() {
        describe('UsersController', function() {
            // The $resource service augments the response object with methods for updating and deleting the resource.
            // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
            // the responses exactly. To solve the problem, we use a newly-defined toEqualData Jasmine matcher.
            // When the toEqualData matcher compares two objects, it takes only object properties into
            // account and ignores methods.
            beforeEach(function() {
                this.addMatchers({
                    toEqualData: function(expected) {
                        return angular.equals(this.actual, expected);
                    }
                });
            });

            // Load the controllers module
            beforeEach(module('startupwichita'));

            // Initialize the controller and a mock scope
            var UsersController,
                scope,
                $httpBackend,
                $stateParams,
                $location;

            // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
            // This allows us to inject a service but then attach it to a variable
            // with the same name as the service.
            beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {

                scope = $rootScope.$new();

                UsersController = $controller('UsersController', {
                    $scope: scope
                });

                $stateParams = _$stateParams_;

                $httpBackend = _$httpBackend_;

                $location = _$location_;

            }));

            it('$scope.find() should create an array with at least one user object ' +
                'fetched from XHR', function() {

                    // test expected GET request
                    $httpBackend.expectGET('/api/v1/users').respond([{
                        name: 'Bob Smith',
                        username: 'bobsmith',
                        email: 'bob@smith.com',
                        bio: 'My name is Bob Smith, what more do you need to know?',
                        tagline: 'The Smithinator'
                    }]);

                    // run controller
                    scope.find();
                    $httpBackend.flush();

                    // test scope value
                    expect(scope.users).toEqualData([{
                        name: 'Bob Smith',
                        username: 'bobsmith',
                        email: 'bob@smith.com',
                        bio: 'My name is Bob Smith, what more do you need to know?',
                        tagline: 'The Smithinator'
                    }]);

                });

            it('$scope.findOne() should create an array with one user object fetched ' +
                'from XHR using a userId URL parameter', function() {
                    // fixture URL parament
                    $stateParams.userId = '525a8422f6d0f87f0e407a33';

                    // fixture response object
                    var testUserData = function() {
                        return {
                            name: 'Bob Smith',
                            username: 'bobsmith',
                            email: 'bob@smith.com',
                            bio: 'My name is Bob Smith, what more do you need to know?',
                            tagline: 'The Smithinator'
                        };
                    };

                    // test expected GET request with response object
                    $httpBackend.expectGET(/api\/v1\/users\/([0-9a-fA-F]{24})$/).respond(testUserData());

                    // run controller
                    scope.findOne();
                    $httpBackend.flush();

                    // test scope value
                    expect(scope.user).toEqualData(testUserData());

                });


            it('$scope.update() should update a valid user', inject(function(Users) {

                // fixture rideshare
                var putUserData = function() {
                    return {
                        _id: '525a8422f6d0f87f0e407a33',
                        username: 'smithinator',
                        email: 'yeah@dude.com'
                    };
                };

                // mock user object from form
                var user = new Users(putUserData());

                // mock userId in scope
                scope.user = user;

                // test PUT happens correctly
                $httpBackend.expectPUT(/api\/v1\/users\/([0-9a-fA-F]{24})$/).respond();

                // run controller
                scope.update();
                $httpBackend.flush();

                // test URL location to new object
                expect($location.path()).toBe('/api/v1/users/' + putUserData()._id);

            }));

        });
    });
}());
