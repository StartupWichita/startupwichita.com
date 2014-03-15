'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    News = mongoose.model('News'),
    Tag = mongoose.model('Tag'),
    User = mongoose.model('User');

//Globals
var news, author, tag;

//The tests
describe('News', function() {
    describe('Model News:', function() {
        beforeEach(function(done) {
            author = new User({
                name: 'Full name',
                email: 'test@test.com',
                username: 'user',
                password: 'password',
                provider: 'local'
            });

            tag = new Tag({'name': 'example'});

            news = new News({
                title: 'Example News',
                tags: [tag],
                content: 'Here is some example content.',
                author: author.id,
                date: new Date()
            });

            done();
        });

        describe('Method Save', function() {
            it('should be able to save without problems', function(done) {
                news.save(done);
            });

            it('should show an error when try to save without date', function(done) {
                news.date = '';
                return news.save(function(err) {
                    should.exist(err);
                    done();
                });
            });

            it('should show an error when try to save without a valid date', function(done) {
                news.date = 'This is not a date';
                return news.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
        });

        afterEach(function(done) {
            news.remove();
            author.remove();
            done();
        });
    });
});
