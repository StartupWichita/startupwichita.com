'use strict';

var should = require('should'),
    app = require('../../../server'),
    mongoose = require('mongoose'),
    request = require('supertest'),
    agent = request.agent(app),
    User = mongoose.model('User');

describe('User routing', function() {
    var email = 'testing@example.com';
    var password = 'test password';
    var user = {
        name: 'Test User',
        email: email,
        username: 'testuser1',
        password: password
    };

    beforeEach(function(done) {
        User.remove({}, done);
    });

    it('should create a new user', function(done) {
        agent
        .post('/api/v1/users')
        .send(user)
        .end(function(err, res) {
            should.not.exist(err);
            res.should.have.status(201);

            res.body.user.email.should.equal(user.email);
            res.body.user.name.should.equal(user.name);
            should.exist(res.body.user.name);
            should.exist(res.body.user.bio);
            should.exist(res.body.user.role);
            should.exist(res.body.user.featured);
            
            should.not.exist(res.body.user.hashed_password);

            done();
        });
    });

    describe('Creation failures', function() {

        it('should reject user with taken username', function(done) {
            var u = new User(user);
            u.save(function(err) {
                should.not.exist(err);

                user.email = 'testing2@example.com';

                agent
                .post('/api/v1/users')
                .send(user)
                .end(function(err, res) {
                    should.not.exist(err);
                    res.should.have.status(500);
                    res.body.message.should.equal('Username already exists');
                    done();
                });
            });
        });

        it('should reject user without provided name', function(done) {
            user.name = undefined;

            agent
            .post('/api/v1/users')
            .send(user)
            .end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(500);
                res.body.message.should.equal('Please fill all the required fields');
                done();
            });
        });

    });

    it('should not allow login for non-existing user', function(done) {
        agent
        .post('/users/session')
        .send({email: 'wrong@email.com', password: password})
        .end(function(err, res) {
            should.not.exist(err);
            res.should.have.status(401);
            done();
        });
    });

    describe('Authenticated', function() {
        var u;

        beforeEach(function(done) {
            user.name = 'Test User';
            user.email = email;

            u = new User(user);

            u.save(function(err) {
                should.not.exist(err);

                agent
                .post('/users/session')
                .send({email: email, password: password})
                .end(function(err, res) {
                    should.not.exist(err);
                    res.should.have.status(302);
                    done();
                });
            });
        });

        it('should login and retrieve profile of existing user', function(done) {
            agent
            .get('/api/v1/users/me')
            .end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(200);

                should.exist(res.body.email);

                res.body.email.should.equal(u.email);
                res.body.name.should.equal(u.name);
                should.exist(res.body.name);
                should.exist(res.body.bio);
                should.exist(res.body.role);
                should.exist(res.body.featured);

                done();
            });
        });

        describe('Update and deletion', function() {
            it('should allow update of logged in user', function(done) {
                var newEmail = 'new@email.com',
                    newName = 'New Name';

                agent
                .put('/api/v1/users/' + u._id)
                .send({email: newEmail, name: newName})
                .end(function(err, res) {
                    should.not.exist(err);
                    res.should.have.status(200);
                    res.body.email.should.equal(newEmail);
                    res.body.name.should.equal(newName);
                    done();
                });
            });

            it('should allow deletion of logged in user', function(done) {
                agent
                .del('/api/v1/users/' + u._id)
                .end(function(err, res) {
                    should.not.exist(err);
                    res.body.name.should.equal('Test User');
                    res.body.email.should.equal('testing@example.com');
                    done();
                });
            });
        });
    });

    describe('Requests of not logged in user', function() {
        it('should exclude sensitive properties for individual request', function(done) {
            var u = new User(user);
            u.save(function(err) {
                should.not.exist(err);

                agent
                .get('/api/v1/users/' + u.id)
                .end(function(err, res) {
                    should.not.exist(res.body.hashed_password);
                    should.not.exist(res.body.email);
                    should.not.exist(res.body.salt);
                    should.not.exist(res.body.provider);
                    should.not.exist(res.body.facebook);
                    should.not.exist(res.body.twitter);
                    should.not.exist(res.body.github);
                    should.not.exist(res.body.google);
                    should.not.exist(res.body.linkedin);

                    should.exist(res.body.id);
                    should.exist(res.body.name);
                    should.exist(res.body.username);
                    should.exist(res.body.role);
                    should.exist(res.body.bio);
                    should.exist(res.body.featured);

                    done();
                });
            });
        });
        it('should exclude sensitive properties for all request', function(done) {
            var u = new User(user);
            u.save(function(err) {
                should.not.exist(err);

                agent
                .get('/api/v1/users/')
                .end(function(err, res) {
                    should.not.exist(res.body[0].hashed_password);
                    should.not.exist(res.body[0].email);
                    should.not.exist(res.body[0].salt);
                    should.not.exist(res.body[0].provider);
                    should.not.exist(res.body[0].facebook);
                    should.not.exist(res.body[0].twitter);
                    should.not.exist(res.body[0].github);
                    should.not.exist(res.body[0].google);
                    should.not.exist(res.body[0].linkedin);

                    should.exist(res.body[0].id);
                    should.exist(res.body[0].name);
                    should.exist(res.body[0].username);
                    should.exist(res.body[0].role);
                    should.exist(res.body[0].bio);
                    should.exist(res.body[0].featured);

                    done();
                });
            });
        });
    });
});

