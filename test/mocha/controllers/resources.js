'use strict';

var should = require('should'),
    app = require('../../../server'),
    mongoose = require('mongoose'),
    request = require('supertest'),
    agent = request.agent(app),
    Resource = mongoose.model('Resource'),
    User = mongoose.model('User'),
    xml2js = require('xml2js'),
    parser = new xml2js.Parser();

describe('Resource routing', function() {
    var user,
        email = 'testing@example.com',
        password = 'test password',
        tags,
        resource;

    before(function(done) {
        tags = ['tag1', 'tag2'];

        user = new User({
            name: 'test user',
            email: email,
            username: 'tester',
            password: password
        });
        user.save(function() {
            resource = {
                title: 'Resource Title',
                content: 'Here is my resource content',
                author: user._id,
                url: 'http://startupwichita.com/resource/1',
                tags: tags
            };

            done();
        });
    });

    describe('Handle CRUD', function () {
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
                user._id.toString().should.be.eql(persistedResource.author);
                tags.should.be.eql(persistedResource.tags);
                done();
            });
        });

        it('should successfully render an rss feed', function(done) {
            agent
            .get('/api/v1/resources.rss')
            .end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(200);

                parser.parseString(res.text, function(err, result) {
                    result.rss.channel[0].item.length.should.eql(1);

                    var item = result.rss.channel[0].item[0];

                    item.title.should.be.eql(['Resource Title']);
                    item.link.should.be.eql(['http://startupwichita.com/resource/1']);
                    item.description.should.be.eql(['Here is my resource content']);
                    item['content:encoded'].should.be.eql(['Here is my resource content']);

                    done();
                });
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
                done();
            });
        });

        it('should successfully retrieve the specified resource', function(done) {
            agent
            .get('/api/v1/resources/' + persistedResource._id)
            .end(function(err, res) {
                persistedResource.author = res.body.author;

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

        it('should fail to mark the resource as spam if not admin', function(done) {
            agent
            .put('/api/v1/resources/' + persistedResource._id + '/spam')
            .send(persistedResource)
            .end(function(err, res) {
                res.should.have.status(401);
                done();
            });
        });

        it('should successfully delete the specified resource', function(done) {
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
            User.remove({}, function () {
                done();
            });
        });
    });
});
