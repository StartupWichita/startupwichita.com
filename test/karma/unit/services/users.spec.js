(function() {
    'use strict';

    // Users Controller Spec
    describe('startupwichita services', function () {
        // Load the startupwichita module
        beforeEach(module('startupwichita'));

        var $httpBackend,
            Users,
            userData;

        userData = [
            { name: 'Bob Smith', username: 'bobsmith' },
            { name: 'Harold Johnson', username: 'haroldjohnson' }
        ];

        beforeEach(inject(function (_Users_, _$httpBackend_) {
            $httpBackend = _$httpBackend_;
            Users = _Users_;
        }));

        describe('UserService', function () {
            it ('should issue GET request to /api/v1/users to get all users', function () {
                $httpBackend.when('GET', '/api/v1/users').respond(userData);

                var users = Users.query();
                $httpBackend.flush();

                expect(users[0].name).toEqual('Bob Smith');
                expect(users[1].name).toEqual('Harold Johnson');
            });
            it('should make query request to /api/v1/users?featured=true', function() {
                $httpBackend.when('GET', '/api/v1/users?featured=true').respond(userData);

                var users = Users.query({ featured: true });
                $httpBackend.flush();

                expect(users[0].name).toEqual('Bob Smith');
                expect(users[1].name).toEqual('Harold Johnson');
            });
            it('should find one user', function() {
                $httpBackend.when('GET', '/api/v1/users/1').respond(userData[0]);

                var user = Users.get({ _id: 1 });
                $httpBackend.flush();

                expect(user.name).toEqual('Bob Smith');
            });
        });
    });
})();
