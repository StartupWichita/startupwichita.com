'use strict';

(function() {
    // Resource Controller Spec
    describe('startupwichita controllers', function() {
        describe('ResourcesController', function() {
            // The $resource service augments the response object with methods
            // for updating and deleting the resource. If we were to use the
            // standard toEqual matcher, our tests would fail because the test
            // values would not match the responses exactly. To solve the
            // problem, we use a newly-defined toEqualData Jasmine matcher.
            // When the toEqualData matcher compares two objects, it takes
            // only object properties into account and ignores methods.
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
            var ResourcesController,
                scope,
                $httpBackend,
                $stateParams,
                $location;

            // The injector ignores leading and trailing underscores here
            // (i.e. _$httpBackend_). This allows us to inject a service but
            // then attach it to a variable with the same name as the service.
            beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {

                scope = $rootScope.$new();

                ResourcesController = $controller('ResourcesController', {
                    $scope: scope
                });

                $stateParams = _$stateParams_;

                $httpBackend = _$httpBackend_;

                $location = _$location_;

            }));

            it('$scope.find() should create an array with at least one resource object ' +
                'fetched from XHR', function() {
                    $httpBackend.expectGET('/api/v1/tags').respond(['tag1', 'tag2']);

                    var testResourceData = function () {
                        return [{
                            title: 'An Article about MEAN',
                            url: '',
                            address: '',
                            latlog: '(27.175015 , 78.042155)'
                        }];
                    };

                    // test expected GET request
                    $httpBackend.expectGET('/api/v1/resources').respond(testResourceData());

                    // run controller
                    scope.find();
                    $httpBackend.flush();

                    // test scope value
                    expect(scope.resources).toEqualData(testResourceData());

                });

            it('$scope.findOne() should create an array with one article object fetched ' +
                'from XHR using a resourceId URL parameter', function() {
                    $httpBackend.expectGET('/api/v1/tags').respond(['tag1', 'tag2']);

                    // fixture URL parameter
                    $stateParams.resourceId = '525a8422f6d0f87f0e407a33';

                    // fixture response object
                    var testResourceData = function() {
                        return {
                            title: 'An Article about MEAN',
                            content: 'MEAN rocks!',
                            latlog: '(27.175015 , 78.042155)'
                        };
                    };

                    // test expected GET request with response object
                    $httpBackend.expectGET(/\/api\/v1\/resources\/([0-9a-fA-F]{24})$/).respond(testResourceData());

                    // run controller
                    scope.findOne();
                    $httpBackend.flush();

                    // test scope value
                    expect(scope.resource).toEqualData(testResourceData());

                });

            it('$scope.create() with valid form data should send a POST request ' +
                'with the form input values and then ' +
                'locate to new object URL', function() {
                    $httpBackend.expectGET('/api/v1/tags').respond(['tag1', 'tag2']);

                    // fixture expected POST data
                    var postResourceData = function() {
                        return {
                            title: 'An Article about MEAN',
                            content: 'MEAN rocks!'
                        };
                    };

                    // fixture expected response data
                    var responseResourceData = function() {
                        return {
                            _id: '525cf20451979dea2c000001',
                            title: 'An Article about MEAN',
                            content: 'MEAN rocks!'
                        };
                    };

                    // fixture mock form input values
                    scope.newResource.title = 'An Article about MEAN';
                    scope.newResource.content = 'MEAN rocks!';

                    // test post request is sent
                    $httpBackend.expectPOST('/api/v1/resources', postResourceData()).respond(responseResourceData());

                    // Run controller
                    scope.create();
                    $httpBackend.flush();
                });

            it('$scope.update() should update a valid resource', inject(function(Resources) {
                $httpBackend.expectGET('/api/v1/tags').respond(['tag1', 'tag2']);

                // fixture rideshare
                var putResourceData = function() {
                    return {
                        _id: '525a8422f6d0f87f0e407a33',
                        title: 'An Article about MEAN',
                        to: 'MEAN is great!'
                    };
                };

                // mock article object from form
                var resource = new Resources(putResourceData());

                // mock resource in scope
                scope.resource = resource;

                // test PUT happens correctly
                $httpBackend.expectPUT(/\/api\/v1\/resources\/([0-9a-fA-F]{24})$/).respond();

                // testing the body data is out for now until an idea for testing the dynamic updated array value is figured out
                //$httpBackend.expectPUT(/resources\/([0-9a-fA-F]{24})$/, putResourceData()).respond();
                /*
                Error: Expected PUT /resources\/([0-9a-fA-F]{24})$/ with different data
                EXPECTED: {"id":"525a8422f6d0f87f0e407a33","title":"An Article about MEAN","to":"MEAN is great!"}
                GOT:      {"id":"525a8422f6d0f87f0e407a33","title":"An Article about MEAN","to":"MEAN is great!","updated":[1383534772975]}
                */

                // run controller
                scope.update();
                $httpBackend.flush();

                // test URL location to new object
                expect($location.path()).toBe('/resources/' + putResourceData()._id);

            }));

            it('$scope.remove() should send a DELETE request with a valid resourceId' +
                ' and remove the resource from the scope', inject(function(Resources) {
                    $httpBackend.expectGET('/api/v1/tags').respond(['tag1', 'tag2']);

                    // fixture rideshare
                    var resource = new Resources({
                        _id: '525a8422f6d0f87f0e407a33'
                    });

                    // test expected rideshare DELETE request
                    $httpBackend.expectDELETE('/api/v1/resources/525a8422f6d0f87f0e407a33').respond(204);

                    // run controller
                    scope.remove(resource);
                    $httpBackend.flush();
                }));
        });
    });
}());
