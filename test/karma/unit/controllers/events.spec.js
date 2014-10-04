'use strict';

(function() {
    // Events Controller Spec
    describe('startupwichita controllers', function() {
        describe('EventsController', function() {
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
            var EventsController,
                scope,
                Global,
                user,
                $httpBackend,
                $stateParams,
                $location;

            // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
            // This allows us to inject a service but then attach it to a variable
            // with the same name as the service.
            beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {

                scope = $rootScope.$new();

                user = {
                    _id: 'abcdef123456',
                    name: 'User McUserton'
                };

                Global = {user: user};

                EventsController = $controller('EventsController', {
                    $scope: scope,
                    Global: Global
                });

                $stateParams = _$stateParams_;

                $httpBackend = _$httpBackend_;

                $location = _$location_;

            }));

            it('$scope.find() should create an array with at least one event object ' +
                'fetched from XHR', function() {

                    $httpBackend.expectGET('/api/v1/tags').respond(['tag1', 'tag2']);

                    // test expected GET request
                    $httpBackend.expectGET('/api/v1/events').respond([{
                        title: 'An Event',
                        content: 'MEAN rocks!',
                        startTime: '3/15/2014 00:00:00',
                        endTime: '3/15/2014 00:00:00',
                        address: '123 Mosely Dr Wichita, KS 67209',
                        author: 'Erik Rodriguez',
                        tags: ['Tag']
                    }]);

                    // run controller
                    scope.find();
                    $httpBackend.flush();

                    // test scope value
                    expect(scope.events).toEqualData([{
                        title: 'An Event',
                        content: 'MEAN rocks!',
                        startTime: '3/15/2014 00:00:00',
                        endTime: '3/15/2014 00:00:00',
                        address: '123 Mosely Dr Wichita, KS 67209',
                        author: 'Erik Rodriguez',
                        tags: ['Tag']
                    }]);

                });

            it('$scope.findOne() should create an array with one event object fetched ' +
                'from XHR using a eventId URL parameter', function() {
                    // fixture URL parament
                    $stateParams.eventId = '525a8422f6d0f87f0e407a33';

                    $httpBackend.expectGET('/api/v1/tags').respond(['tag1', 'tag2']);

                    // fixture response object
                    var testEventData = function() {
                        return {
                            title: 'An Event',
                            content: 'MEAN rocks!',
                            startTime: '3/15/2014 00:00:00',
                            endTime: '3/15/2014 00:00:00',
                            address: '123 Mosely Dr Wichita, KS 67209',
                            author: 'Erik Rodriguez',
                            tags: ['Tag']
                        };
                    };

                    // test expected GET request with response object
                    $httpBackend.expectGET(/api\/v1\/events\/([0-9a-fA-F]{24})$/).respond(testEventData());

                    // run controller
                    scope.findOne();
                    $httpBackend.flush();

                    // test scope value
                    expect(scope.event).toEqualData(testEventData());

                });

            it('$scope.create() with valid form data should send a POST request ' +
                'with the form input values and then ' +
                'locate to new object URL', function() {
                    $httpBackend.expectGET('/api/v1/tags').respond(['tag1', 'tag2']);

                    // fixture expected POST data
                    var postEventData = function() {
                        return {
                            title: 'An Event about MEAN',
                            content: 'MEAN rocks!',
                            startTime: '3/15/2014 00:00:00',
                            endTime: '3/15/2014 00:00:00',
                            address: '123 Mosely Dr Wichita, KS 67209',
                            author: 'abcdef123456',
                            tags: ['Tag']
                        };
                    };

                    // fixture expected response data
                    var responseEventData = function() {
                        return {
                            _id: '525cf20451979dea2c000001',
                            title: 'An Event about MEAN',
                            content: 'MEAN rocks!',
                            startTime: '3/15/2014 00:00:00',
                            endTime: '3/15/2014 00:00:00',
                            address: '123 Mosely Dr Wichita, KS 67209',
                            author: 'Erik Rodriguez',
                            tags: ['Tag']
                        };
                    };

                    // fixture mock form input values
                    scope.newEvent.title = 'An Event about MEAN';
                    scope.newEvent.content = 'MEAN rocks!';
                    scope.newEvent.startTime = '3/15/2014 00:00:00';
                    scope.newEvent.endTime = '3/15/2014 00:00:00';
                    scope.newEvent.address = '123 Mosely Dr Wichita, KS 67209';
                    scope.newEvent.author = 'Erik Rodriguez';
                    scope.newEvent.tags = ['Tag'];

                    // test post request is sent
                    $httpBackend.expectPOST('/api/v1/events', postEventData()).respond(responseEventData());

                    // Run controller
                    scope.create();
                    $httpBackend.flush();
                });

            it('$scope.update() should update a valid event', inject(function(Events) {

                $httpBackend.expectGET('/api/v1/tags').respond(['tag1', 'tag2']);
                // fixture rideshare
                var putEventData = function() {
                    return {
                        _id: '525a8422f6d0f87f0e407a33',
                        title: 'An Event about MEAN',
                        to: 'MEAN is great!'
                    };
                };

                // mock event object from form
                var event = new Events(putEventData());

                // mock eventId in scope
                scope.event = event;

                // test PUT happens correctly
                $httpBackend.expectPUT(/api\/v1\/events\/([0-9a-fA-F]{24})$/).respond();

                // run controller
                scope.update();
                $httpBackend.flush();
            }));

            it('$scope.remove() should send a DELETE request with a valid eventId' +
                'and remove the event from the scope', inject(function(Events) {
                    $httpBackend.expectGET('/api/v1/tags').respond(['tag1', 'tag2']);

                    // fixture rideshare
                    var event = new Events({
                        _id: '525a8422f6d0f87f0e407a33'
                    });

                    // test expected rideshare DELETE request
                    $httpBackend.expectDELETE(/api\/v1\/events\/([0-9a-fA-F]{24})$/).respond(204);

                    // run controller
                    scope.remove(event);
                    $httpBackend.flush();
                }));
        });
    });
}());
