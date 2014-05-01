'use strict';

var should = require('should'),
    app = require('../../../server'),
    mongoose = require('mongoose'),
    request = require('supertest'),
    agent = request.agent(app),
    News = mongoose.model('News'),
    Tag = mongoose.model('Tag'),
    User = mongoose.model('User');

describe('News routing', function() {
    var user,
        email = 'testing@example.com',
        password = 'test password';

    before(function(done) {
        user = new User({
            name: 'Test User',
            email: email,
            username: 'tester',
            password: password
        });
        user.save();

        done();
    });

    describe('Handle CRUD', function () {
        var tag_foo = new Tag({name: 'foo'}),
            tag_bar = new Tag({name: 'bar'});
        tag_foo.save();
        tag_bar.save();
        var tags = [tag_foo.id, tag_bar.id];

        var author = new User({
            name: 'Some author',
            email: 'foo@bar.com',
            username: 'author',
            password: 'password1234'
        });
        author.save();

        var person_1 = new User({
            name: 'Some person',
            email: 'person_1@foobar.com',
            username: 'person_1',
            password: 'password1234'
        });
        person_1.save();
        var person_2 = new User({
            name: 'Some person',
            email: 'person_2@foobar.com',
            username: 'person_2',
            password: 'password1234'
        });
        person_2.save();
        var people = [person_1.id, person_2.id];

        var newsItem = {
            title: 'News Title',
            content: 'This is my news description',
            tags: tags,
            people: people,
            date: new Date('1985-12-19 00:00:00'),
            author: author.id
        };

        var persistedNewsItem;

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

        it('should successfully insert a new news item', function(done) {
            agent
            .post('/api/v1/news')
            .send(newsItem)
            .end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(201);
                persistedNewsItem = res.body;
                should.exist(persistedNewsItem.created_at);
                author.id.should.be.eql(persistedNewsItem.author);
                tags.should.be.eql(persistedNewsItem.tags);
                people.should.be.eql(persistedNewsItem.people);
                done();
            });
        });

        it('should successfully retrieve one news item', function(done) {
            agent
            .get('/api/v1/news')
            .end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(200);
                res.body.length.should.eql(1);
                res.body[0].should.be.eql(persistedNewsItem);
                done();
            });
        });

        it('should successfully retrieve the specified news item', function(done) {
            agent
            .get('/api/v1/news/' + persistedNewsItem._id)
            .end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(200);
                res.body.should.be.eql(persistedNewsItem);
                done();
            });
        });

        it('should successfully update requested news item', function(done) {
            var updatedNewsItem = persistedNewsItem;
            updatedNewsItem.content = 'Updated Content';

            agent
            .put('/api/v1/news/' + persistedNewsItem._id)
            .send(updatedNewsItem)
            .end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(200);
                res.body.content.should.be.eql(updatedNewsItem.content);
                res.body.updated_at.should.not.be.eql(updatedNewsItem.updated_at);
                done();
            });
        });

        it('should successfully delete the specified news item', function(done) {
            var updatedNewsItem = persistedNewsItem;
            updatedNewsItem.content = 'Updated Content';

            agent
            .del('/api/v1/news/' + persistedNewsItem._id)
            .end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(204);
                done();
            });
        });
    });

    after(function(done) {
        News.remove({}, function(err) {
            if (err) return done();
            User.remove({}, function (err) {
                if (err) return done();
                Tag.remove({}, done);
            });
        });
    });
});

