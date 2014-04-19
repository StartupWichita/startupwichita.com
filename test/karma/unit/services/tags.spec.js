(function() {
    'use strict';

    // Tags Controller Spec
    describe('startupwichita services', function () {
        // Load the startupwichita module
        beforeEach(module('startupwichita'));

        describe('tagsService', function () {
            it ('should issue PUT request to /api/v1/tags1/:id', inject(function(Tags, $httpBackend) {
                var tagId = '507f1f77bcf86cd799439011',
                    updateTag,
                    updateTimestamp = Date.now();

                $httpBackend.when('PUT', '/api/v1/tags/' + tagId).respond({id: tagId, name: 'Tag 1', updated: updateTimestamp});

                updateTag = new Tags({
                    id: tagId,
                    name: 'Tag 1'
                });

                updateTag.$update();

                $httpBackend.flush();
                expect(updateTag.id).toEqual('507f1f77bcf86cd799439011');
                expect(updateTag.name).toEqual('Tag 1');
                expect(updateTag.updated).toEqual(updateTimestamp);
            }));
        });

        describe('tagsService', function () {
            it ('should issue GET request to /api/v1/tags?search=tag', inject(function(Tags, $httpBackend) {
                $httpBackend.when('GET', '/api/v1/tags?search=tag').respond([
                    {id: '507f1f77bcf86cd799439011', name: 'Tag 1'},
                    {id: '507f1f77bcf86cd799439012', name: 'Tag 2'}
                ]);

                var tag = Tags.search({search: 'tag'});

                $httpBackend.flush();
                expect(tag[0].id).toEqual('507f1f77bcf86cd799439011');
                expect(tag[0].name).toEqual('Tag 1');
            }));
        });

        describe('tagsService', function () {
            it ('should issue GET request to /api/v1/tags/507f1f77bcf86cd799439011', inject(function(Tags, $httpBackend) {
                $httpBackend.when('GET', '/api/v1/tags/507f1f77bcf86cd799439011').respond({id: '507f1f77bcf86cd799439011', name: 'Tag 1'});

                var tag = Tags.get({id: '507f1f77bcf86cd799439011'});

                $httpBackend.flush();
                expect(tag.id).toEqual('507f1f77bcf86cd799439011');
                expect(tag.name).toEqual('Tag 1');
            }));
        });
    });
})();
