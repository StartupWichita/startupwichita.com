'use strict';

var should = require('should'),
    app = require('../../../server'),
    mongoose = require('mongoose'),
    Resource = mongoose.model('Resource'),
    request = require('supertest'),
    agent = request.agent(app),
    User = mongoose.model('User');

describe('Resource routing', function() {
    var user;
    var email = 'testing@example.com';
    var password = 'test password';

    before(function(done) {
        user = new User(
            {
                name: 'Test User',
                email: email,
                username: 'tester',
                password: password
            }
        );
        user.save();

        done();
    });

    describe('Handle CRUD', function () {
        var resource = {
            title: 'Resource Title',
            tags: [],
            content: 'Here is my resource content',
            url: 'http://google.com'
        };

        var persistedResource;

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

        it('should successfully insert a new resource', function(done) {
            agent
            .post('/api/v1/resources')
            .send(resource)
            .end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(201);
                persistedResource = res.body;
                done();
            });
        });

        it('should successfully retrieve one resource', function(done) {
            agent
            .get('/api/v1/resources')
            .end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(200);
                res.body.length.should.eql(1);
                res.body[0].should.be.eql(persistedResource);
                res.body[0].should.be.eql(persistedResource);
                done();
            });
        });

        it('should successfully retrieve the specified resource', function(done) {
            agent
            .get('/api/v1/resources/' + persistedResource._id)
            .end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(200);
                res.body.should.be.eql(persistedResource);
                done();
            });
        });

        it('should successfully update requested resource', function(done) {
            var updatedResource = persistedResource;
            updatedResource.content = 'Updated Content';

            agent
            .put('/api/v1/resources/' + persistedResource._id)
            .send(updatedResource)
            .end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(200);
                res.body.content.should.be.eql(updatedResource.content);
                res.body.updated_at.should.not.be.eql(updatedResource.updated_at);
                done();
            });
        });

        it('should successfully delete the specified resource', function(done) {
            var updatedResource = persistedResource;
            updatedResource.content = 'Updated Content';

            agent
            .del('/api/v1/resources/' + persistedResource._id)
            .end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(204);
                done();
            });
        });
    });

    after(function(done) {
        Resource.remove({}, function(err) {
            if (err) return done();
            User.remove({}, done);
        });
    });
});

