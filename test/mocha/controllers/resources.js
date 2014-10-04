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
        password = 'test password';

    before(function(done) {
        user = new User({
            name: 'test user',
            email: email,
            username: 'tester',
            password: password,
            role: 'Admin'
        });
        user.save(done);
    });

    describe('Handle CRUD', function () {
        var tags = ['tag1', 'tag2'];

        var author = new User({
            name: 'Some author',
            email: 'foo@bar.com',
            username: 'author',
            password: 'password1234'
        });
        author.save();

        var resource = {
            title: 'Resource Title',
            tags: tags,
            content: 'Here is my resource content',
            author: author._id,
            url: 'http://startupwichita.com/resource/1'
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
                author._id.toString().should.be.eql(persistedResource.author);
                tags.toString().should.be.eql(persistedResource.tags.toString());
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

        it('should successfully mark the resource as spam', function(done) {
            agent
            .put('/api/v1/resources/' + persistedResource._id + '/spam')
            .send(persistedResource)
            .end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(200);
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
