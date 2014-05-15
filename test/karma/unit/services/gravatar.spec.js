(function() {
    'use strict';

    // Articles Controller Spec
    describe('startupwichita services', function () {
        // Load the controllers module
        beforeEach(module('startupwichita'));

        describe('gravatarService', function () {
            it('returns returns correct url with provided email hash and size', inject(function (Gravatar) {
                expect(Gravatar.buildGravatarUrl('4f64c9f81bb0d4ee969aaf7b4a5a6f40', 200)).toBe('http://www.gravatar.com/avatar/4f64c9f81bb0d4ee969aaf7b4a5a6f40.jpg?s=200&r=g');
            }));
        });
    });
})();
