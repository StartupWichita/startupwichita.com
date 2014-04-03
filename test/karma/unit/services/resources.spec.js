(function() {
    'use strict';

    describe('startupwichita services', function () {
        // Load the controllers module
        beforeEach(module('startupwichita'));

        describe('resourcesService', function () {
            it('should issue PUT request to /api/v1/resources/:_id', inject(function(Resources, $httpBackend) {
                var resourceId = '3868196935174ebc27bfc86c60f95f01e18b66b4',
                    updateResource,
                    updateTimestamp = Date.now();

                $httpBackend.expectPUT('/api/v1/resources/' + resourceId).respond({_id: resourceId, title: 'Labor Party', updated: updateTimestamp});

                updateResource = new Resources({
                    _id: resourceId,
                    title: 'Labor Party'
                });

                updateResource.$update();

                $httpBackend.flush();

                expect(updateResource._id).toEqual(resourceId);
                expect(updateResource.title).toEqual('Labor Party');
                expect(updateResource.updated).toEqual(updateTimestamp);
            }));

            it('should should issues GET request to /api/v1/resources?search=labor+party', inject(function(Resources, $httpBackend) {
                $httpBackend.expectGET('/api/v1/resources?search=labor+party').respond([
                    {_id: '3868196935174ebc27bfc86c60f95f01e18b66b4', title: 'Labor Party'}
                ]);

                var resources = Resources.search({search: 'labor party'});

                $httpBackend.flush();

                expect(resources[0]._id).toBe('3868196935174ebc27bfc86c60f95f01e18b66b4');
                expect(resources[0].title).toBe('Labor Party');
            }));
        });
    });
})();
