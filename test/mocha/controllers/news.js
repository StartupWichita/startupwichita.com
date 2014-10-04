'use strict';

var should = require('should'),
    app = require('../../../server'),
    mongoose = require('mongoose'),
    request = require('supertest'),
    agent = request.agent(app),
    News = mongoose.model('News'),
    User = mongoose.model('User'),
    xml2js = require('xml2js'),
    parser = new xml2js.Parser();

describe('News routing', function() {
    var user,
        email = 'testing@example.com',
        password = 'test password',
        people,
        newsItem;

    before(function(done) {
        user = new User({
            name: 'Test User',
            email: email,
            username: 'tester',
            password: password,
            role: 'Admin'
        });
        user.save(function() {
            var person_1 = new User({
                name: 'Some person',
                email: 'person_1@foobar.com',
                username: 'person_1',
                password: 'password1234'
            });
            person_1.save(function() {
                var person_2 = new User({
                    name: 'Some person',
                    email: 'person_2@foobar.com',
                    username: 'person_2',
                    password: 'password1234'
                });
                person_2.save(function() {
                    people = [person_1._id.toString(), person_2._id.toString()];
                    newsItem = {
                        title: 'News Title',
                        content: 'This is my news description',
                        people: people,
                        author: user._id,
                        url: 'http://site.news.fake/story/42'
                    };
                    done();
                });
            });
        });
    });

    describe('Handle CRUD', function () {
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
                // We get the item back in the response from POST. We use
                // that in future tests. Right now "author" is not
                // populated with the user object so test that the ID is
                // there then inject it ourselves
                persistedNewsItem = res.body;
                user._id.toString().should.be.eql(persistedNewsItem.author);
                persistedNewsItem.author = user;

                should.exist(persistedNewsItem.created_at);
                people.should.be.eql(persistedNewsItem.people);
                done();
            });
        });

        it('should successfully render an rss feed', function(done) {
            agent
            .get('/api/v1/news.rss')
            .end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(200);

                parser.parseString(res.text, function(err, result) {
                    result.rss.channel[0].item.length.should.eql(1);

                    var item = result.rss.channel[0].item[0];

                    item.title.should.be.eql(['News Title']);
                    item.link.should.be.eql(['http://site.news.fake/story/42']);
                    item.description.should.be.eql(['This is my news description']);
                    item['content:encoded'].should.be.eql(['This is my news description']);

                    done();
                });
            });
        });

        it('should successfully retrieve one news item', function(done) {
            agent
            .get('/api/v1/news')
            .end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(200);
                res.body.length.should.eql(1);
                var responseObject = res.body[0];
                responseObject._id.should.be.eql(persistedNewsItem._id);
                done();
            });
        });

        it('should successfully retrieve the specified news item', function(done) {
            agent
            .get('/api/v1/news/' + persistedNewsItem._id)
            .end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(200);
                var responseObject = res.body;
                responseObject._id.should.be.eql(persistedNewsItem._id);
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

        it('should successfully mark the news item as spam', function(done) {
            agent
            .put('/api/v1/news/' + persistedNewsItem._id + '/spam')
            .send(persistedNewsItem)
            .end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(200);
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
            User.remove({}, function () {
                done();
            });
        });
    });
});
