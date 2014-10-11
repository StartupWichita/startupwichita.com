'use strict';

var should = require('should'),
    app = require('../../../server'),
    mongoose = require('mongoose'),
    request = require('supertest'),
    agent = request.agent(app),
    Event = mongoose.model('Event'),
    User = mongoose.model('User'),
    xml2js = require('xml2js'),
    parser = new xml2js.Parser();

describe('Event routing', function() {
    var user,
        email = 'testing@example.com',
        password = 'test password';

    before(function(done) {
        user = new User({
            name: 'Test User',
            email: email,
            password: password
        });
        user.save(done);
    });

    describe('Handle CRUD', function () {
        var tags = ['tag1', 'tag2'];

        var author = new User({
            name: 'Some author',
            email: email,
            password: password
        });
        author.save();

        var event = {
            title: 'Event Title',
            tags: tags,
            content: 'This is my event description',
            author: author._id,
            startTime: new Date(),
            endTime: new Date(),
            address: '216 N Mosley, Wichita, KS 67202',
            url: 'http://startupwichita.com/event/1'
        };

        var persistedEvent;

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

        it('should successfully insert a new event', function(done) {
            agent
            .post('/api/v1/events')
            .send(event)
            .end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(201);
                persistedEvent = res.body;
                should.exist(persistedEvent.created_at);
                author._id.toString().should.be.eql(persistedEvent.author);
                tags.should.be.eql(persistedEvent.tags);
                done();
            });
        });

        it('should successfully render an rss feed', function(done) {
            agent
            .get('/api/v1/events.rss')
            .end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(200);

                parser.parseString(res.text, function(err, result) {
                    result.rss.channel[0].item.length.should.eql(1);

                    var item = result.rss.channel[0].item[0];

                    item.title.should.be.eql(['Event Title']);
                    item.link.should.be.eql(['http://startupwichita.com/event/1']);
                    item.description.should.be.eql(['This is my event description']);
                    item['content:encoded'].should.be.eql(['This is my event description']);

                    done();
                });
            });
        });

        it('should successfully retrieve one event', function(done) {
            agent
            .get('/api/v1/events')
            .end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(200);
                res.body.length.should.eql(1);
                res.body[0].should.be.eql(persistedEvent);
                done();
            });
        });

        it('should successfully retrieve the specified event', function(done) {
            agent
            .get('/api/v1/events/' + persistedEvent._id)
            .end(function(err, res) {
                persistedEvent.author = res.body.author;

                should.not.exist(err);
                res.should.have.status(200);
                res.body.should.be.eql(persistedEvent);
                done();
            });
        });

        it('should successfully update requested event', function(done) {
            var updatedEvent = persistedEvent;
            updatedEvent.content = 'Updated Content';

            agent
            .put('/api/v1/events/' + persistedEvent._id)
            .send(updatedEvent)
            .end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(200);
                res.body.content.should.be.eql(updatedEvent.content);
                res.body.updated_at.should.not.be.eql(updatedEvent.updated_at);
                done();
            });
        });

        it('should fail to mark the event as spam if not admin', function(done) {
            agent
            .put('/api/v1/events/' + persistedEvent._id + '/spam')
            .send(persistedEvent)
            .end(function(err, res) {
                res.should.have.status(401);
                done();
            });
        });

        it('should successfully delete the specified event', function(done) {
            agent
            .del('/api/v1/events/' + persistedEvent._id)
            .end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(204);
                done();
            });
        });
    });

    after(function(done) {
        Event.remove({}, function(err) {
            if (err) return done();
            User.remove({}, function () {
                done();
            });
        });
    });
});
