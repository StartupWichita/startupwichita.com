'use strict';

var should = require('should'),
    app = require('../../../server'),
    mongoose = require('mongoose'),
    request = require('supertest'),
    agent = request.agent(app),
    Tag = mongoose.model('Tag'),
    User = mongoose.model('User');

describe('Tag routing', function() {
    var user,
        email = 'testing@example.com',
        password = 'test password';

    before(function(done) {
        user = new User({
            name: 'test user',
            email: email,
            username: 'tester',
            password: password
        });
        user.save(done);
    });

    describe('Handle CRUD', function () {
        var tag = {
            name: 'Foo Tag'
        };

        var persistedTag;

        it('login', function(done) {
            agent
            .post('/users/session')
            .send({email: email, password: password})
            .end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(302);
                done();
            });
        });

        it('should gracefully handle requests missing a name', function(done) {
            agent
            .post('/api/v1/tags')
            .send({})
            .end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(500);
                done();
            });
        });

        it('should successfully insert a new tag', function(done) {
            agent
            .post('/api/v1/tags')
            .send(tag)
            .end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(201);
                persistedTag = res.body;
                done();
            });
        });

        it('should not include the internal field name_upper', function(done) {
            should.not.exist(persistedTag.name_upper);
            done();
        });

        it('should successfully retrieve one tag', function(done) {
            agent
            .get('/api/v1/tags')
            .end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(200);
                res.body.length.should.eql(1);
                res.body[0].should.be.eql(persistedTag);
                done();
            });
        });

        it('should successfully retrieve the specified tag', function(done) {
            agent
            .get('/api/v1/tags/' + persistedTag._id)
            .end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(200);
                res.body.should.be.eql(persistedTag);
                done();
            });
        });

        it('should successfully update requested tag', function(done) {
            var updatedTag = persistedTag;
            updatedTag.name = 'Bar Tag';

            agent
            .put('/api/v1/tags/' + persistedTag._id)
            .send(updatedTag)
            .end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(200);
                res.body.name.should.be.eql(updatedTag.name);
                res.body.updated_at.should.not.be.eql(updatedTag.updated_at);
                done();
            });
        });

        it('should successfully delete the specified tag', function(done) {
            agent
            .del('/api/v1/tags/' + persistedTag._id)
            .end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(204);
                done();
            });
        });
    });

    after(function(done) {
        Tag.remove({}, function(err) {
            if (err) return done();
            User.remove({}, done);
        });
    });
});
