(function() {
    'use strict';

    describe('startupwichita services', function () {
        // Load the controllers module
        beforeEach(module('startupwichita'));

        describe('resourcesService', function () {
            it('should issue PUT request to /api/v1/resources/', inject(function(Resources, $httpBackend) {
                var updateResource,
                    updateTimestamp = Date.now();

                $httpBackend.expectPUT('/api/v1/resources').respond({id: '3868196935174ebc27bfc86c60f95f01e18b66b4', name: 'Labor Party', updated: updateTimestamp});

                updateResource = new Resources({
                    id: '3868196935174ebc27bfc86c60f95f01e18b66b4',
                    name: 'Labor Party'
                });

                updateResource.$update();

                $httpBackend.flush();

                expect(updateResource.id).toEqual('3868196935174ebc27bfc86c60f95f01e18b66b4');
                expect(updateResource.name).toEqual('Labor Party');
                expect(updateResource.updated).toEqual(updateTimestamp);
            }));

            it('should should issues GET request to /api/v1/resources?search=labor+party', inject(function(Resources, $httpBackend) {
                $httpBackend.expectGET('/api/v1/resources?search=labor+party').respond([
                    {id: '3868196935174ebc27bfc86c60f95f01e18b66b4', name: 'Labor Party'}
                ]);

                var resources = Resources.search({search: 'labor party'});

                $httpBackend.flush();

                expect(resources[0].id).toBe('3868196935174ebc27bfc86c60f95f01e18b66b4');
                expect(resources[0].name).toBe('Labor Party');
            }));
        });
    });
})();
