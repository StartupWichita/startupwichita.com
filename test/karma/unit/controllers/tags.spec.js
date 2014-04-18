(function(angular) {
    'use strict';

    describe('startupwichita controllers', function() {
        describe('TagsController', function() {
            var TagsController,
                scope;

            beforeEach(function () {
                this.addMatchers({
                    toEqualData: function (expected) {
                        return angular.equals(this.actual, expected);
                    }
                });
            });

            beforeEach(module('startupwichita'));

            beforeEach(inject(function ($controller, $rootScope) {
                scope = $rootScope.$new();

                TagsController = $controller('TagsController', {
                    $scope: scope
                });
            }));

            it('$scope.find() should create an array with at least one tag object fetched from XHR',
                inject(function ($httpBackend) {
                    var tagList = [
                        {id: '507f1f77bcf86cd799439011', name: 'Tag 1', count: 100, primary: true},
                        {id: '507f1f77bcf86cd799439012', name: 'Tag 2', count: 5, primary: false}
                    ];

                    $httpBackend.expectGET('/api/v1/tags').respond(tagList);

                    scope.find();
                    $httpBackend.flush();

                    expect(scope.tags[0]).toEqualData(tagList[0]);
                    expect(scope.tags[1]).toEqualData(tagList[1]);
                })
            );

            it('$scope.findOne() should create a tag object fetched from XHR using a articleId URL parameter',
                inject(function ($httpBackend, $stateParams) {
                    var tagId = '525a8422f6d0f87f0e407a33';
                    var testTagData = {id: tagId, name: 'Tag 1', primary: true};

                    $stateParams.id = tagId;

                    // test expected GET request with response object
                    $httpBackend.expectGET('/api/v1/tags/' + tagId).respond(testTagData);

                    // run controller
                    scope.findOne();
                    $httpBackend.flush();

                    // test scope value
                    expect(scope.tag).toEqualData(testTagData);
                })
            );

            it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL',
                inject(function ($httpBackend) {
                    var responseTagData = {id: '507f1f77bcf86cd799439011', name: 'Tag 1', primary: true};

                    // fixture mock form input values
                    scope.name = responseTagData.name;
                    scope.primary = responseTagData.primary;
                    scope.tags = [];

                    // test post request is sent
                    $httpBackend.expectPOST('/api/v1/tags').respond(responseTagData);

                    // Run controller
                    scope.create();
                    $httpBackend.flush();

                    // test form input(s) are reset
                    expect(scope.name).toEqual('');
                    expect(scope.primary).toBeFalsy();
                    expect(scope.tags.length).toBe(1);
                })
            );

            it('$scope.update() should update a valid tag', inject(function($httpBackend, Tags) {
                var tagId = '507f1f77bcf86cd799439011',
                    putTagData = {id: tagId, name: 'Tag 1'},
                    putTagDataResponse = {id: tagId, name: 'Tag 1', updatedAt: Date.now()};

                scope.tags = [{id: tagId, name: 'Tag 2'}];
                scope.tag = new Tags(putTagData);

                $httpBackend.expectPUT('/api/v1/tags/' + tagId, putTagData).respond(putTagDataResponse);

                // run controller
                scope.update();
                $httpBackend.flush();

                expect(scope.tag).toEqualData(putTagDataResponse);
                expect(scope.tags[0]).toEqualData(putTagDataResponse);
                expect(scope.tags.length).toBe(1);
            }));

            it('$scope.update(tag) should update a valid tag', inject(function($httpBackend, Tags) {
                var tagId = '507f1f77bcf86cd799439011',
                    putTagData = {id: tagId, name: 'Tag 1'},
                    putTagDataResponse = {id: tagId, name: 'Tag 1', updatedAt: Date.now()},
                    updateTag;

                scope.tags = [{id: tagId, name: 'Tag 2'}];
                scope.tag = null;

                updateTag = new Tags(putTagData);

                $httpBackend.expectPUT('/api/v1/tags/' + tagId, putTagData).respond(putTagDataResponse);

                // run controller
                scope.update(updateTag);
                $httpBackend.flush();

                expect(scope.tags[0]).toEqualData(putTagDataResponse);
                expect(scope.tags.length).toBe(1);
            }));

            it('$scope.remove() should send a DELETE request with a valid tagId' +
                'and remove the article from the scope', inject(function($httpBackend, Tags) {

                var tags = [
                    new Tags({id: '507f1f77bcf86cd799439011', name: 'Tag 1'}),
                    new Tags({id: '507f1f77bcf86cd799439012', name: 'Tag 1'})
                ];

                scope.tags = [];
                scope.tags.push(tags[0]);
                scope.tags.push(tags[1]);

                $httpBackend.expectDELETE('/api/v1/tags/' + tags[0].id).respond(204);

                // run controller
                scope.remove(tags[0]);
                $httpBackend.flush();

                expect(scope.tags.length).toBe(1);

                scope.tag = tags[1];

                $httpBackend.expectDELETE('/api/v1/tags/' + tags[1].id).respond(204);

                // run controller
                scope.remove();
                $httpBackend.flush();

                expect(scope.tags.length).toBe(0);
            }));
        });
    });
}(window.angular));
