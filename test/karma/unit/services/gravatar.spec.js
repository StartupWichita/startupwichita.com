(function() {
    'use strict';

    // Articles Controller Spec
    describe('startupwichita services', function () {
        // Load the controllers module
        beforeEach(module('startupwichita'));

        describe('gravatarService', function () {
            it('returns returns default url with invalid email', inject(function (Gravatar) {
                expect(Gravatar.buildGravatarUrl('wrong', 200)).toBe('http://www.gravatar.com/avatar/0.jpg?s=200');
            }));

            it('returns returns correct url with valid email', inject(function (Gravatar) {
                expect(Gravatar.buildGravatarUrl('email@email.com', 200)).toBe('http://www.gravatar.com/avatar/4f64c9f81bb0d4ee969aaf7b4a5a6f40.jpg?s=200&r=g');
            }));
        });
    });
})();
