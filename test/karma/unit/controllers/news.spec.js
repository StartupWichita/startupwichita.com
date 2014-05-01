'use strict';

(function() {
    // News Controller Spec
    describe('startupwichita controllers', function() {
        describe('NewsController', function() {
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
            var NewsController,
                scope,
                $httpBackend,
                $stateParams,
                $location;

            // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
            // This allows us to inject a service but then attach it to a variable
            // with the same name as the service.
            beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {

                scope = $rootScope.$new();

                NewsController = $controller('NewsController', {
                    $scope: scope
                });

                $stateParams = _$stateParams_;

                $httpBackend = _$httpBackend_;

                $location = _$location_;

            }));

            it('$scope.find() should create an array with at least one newsItem object ' +
                'fetched from XHR', function() {

                    // test expected GET request
                    $httpBackend.expectGET('/api/v1/news').respond([{
                        title: 'An NewsItem about MEAN',
                        content: 'MEAN rocks!'
                    }]);

                    // run controller
                    scope.find();
                    $httpBackend.flush();

                    // test scope value
                    expect(scope.news[0].title).toBe('An NewsItem about MEAN');
                    expect(scope.news[0].content).toBe('MEAN rocks!');
                });

            it('$scope.findOne() should create an array with one newsItem object fetched ' +
                'from XHR using a newsId URL parameter', function() {
                    var newsItemId = '525a8422f6d0f87f0e407a33';
                    // fixture URL parament
                    $stateParams.newsItemId = newsItemId;

                    // fixture response object
                    var testNewsData = function() {
                        return {
                            _id: newsItemId,
                            title: 'An News item about Start Up Wichita',
                            content: 'Start Up Wichita rocks!'
                        };
                    };

                    // test expected GET request with response object
                    $httpBackend.expectGET('/api/v1/news/' + newsItemId)
                                .respond(testNewsData());

                    // run controller
                    scope.findOne();
                    $httpBackend.flush();

                    // test scope value
                    expect(scope.currentItem).toEqualData(testNewsData());

                });

            it('$scope.create() with valid form data should send a POST request ' +
                'with the form input values and then ' +
                'locate to new object URL', function() {

                    // fixture expected response data
                    var responseNewsData = function() {
                        return {
                            _id: '525cf20451979dea2c000001',
                            title: 'An NewsItem about MEAN',
                            content: 'MEAN rocks!'
                        };
                    };

                    // fixture mock form input values
                    scope.title = 'An NewsItem about MEAN';
                    scope.content = 'MEAN rocks!';

                    // test post request is sent
                    $httpBackend.expectPOST('/api/v1/news').respond(responseNewsData());

                    // Run controller
                    scope.create();
                    $httpBackend.flush();

                    // test URL location to new object
                    expect($location.path()).toBe('/news/' + responseNewsData()._id);
                });

            it('$scope.update() should update a valid newsItem', inject(function(News) {
                var newsItemId = '525a8422f6d0f87f0e407a33';

                // fixture news item
                var putNewsData = function() {
                    return {
                        _id: newsItemId,
                        title: 'An NewsItem about Start Up Wichita',
                        to: 'Start Up Wichita is great!'
                    };
                };

                // mock newsItem object from form
                var newsItem = new News(putNewsData());

                // mock newsItem in scope
                scope.currentItem = newsItem;

                // test PUT happens correctly
                $httpBackend.expectPUT('/api/v1/news/' + newsItemId).respond();

                // run controller
                scope.update();
                $httpBackend.flush();

                // test URL location to new object
                expect($location.path()).toBe('/news/' + putNewsData()._id);

            }));

            it('$scope.remove() should send a DELETE request with a valid _id' +
                'and remove the newsItem from the scope', inject(function(News) {
                    var newsItemId = '525a8422f6d0f87f0e407a33';

                    // fixture news item
                    var newsItem = new News({
                        _id: newsItemId
                    });

                    // mock news items in scope
                    scope.news = [];
                    scope.news.push(newsItem);

                    // test expected news item DELETE request
                    $httpBackend.expectDELETE('/api/v1/news/' + newsItemId).respond(204);

                    // run controller
                    scope.remove(newsItem);
                    $httpBackend.flush();

                    // test after successful delete URL location news lis
                    //expect($location.path()).toBe('/news');
                    expect(scope.news.length).toBe(0);

                }));
        });
    });
}());
