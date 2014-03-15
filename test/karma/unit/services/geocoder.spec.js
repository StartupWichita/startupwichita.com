(function(sinon) {
    'use strict';

    // Articles Controller Spec
    describe('startupwichita services', function () {
        var googleMockResource;

        // Load the controllers module
        beforeEach(module('startupwichita'));

        beforeEach(inject(function($window) {
            googleMockResource = {
                geocode: sinon.spy()
            };

            $window.google = {
                maps: {
                    Geocoder: sinon.stub().returns(googleMockResource)
                }
            };
        }));

        describe('geocoderService', function () {
            it('should call', inject(function(Geocoder) {
                Geocoder.latLngForAddress('216 N Mosley, Wichita, KS 67202');

                expect(googleMockResource.geocode.calledOnce);
            }));
        });
    });
})(window.sinon);
