'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    News = mongoose.model('News'),
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

            tag = 'tag1';

            author.save(function() {
                news = new News({
                    title: 'Example News',
                    tags: [tag],
                    content: 'Here is some example content.',
                    author: author._id,
                });

                done();
            });
        });

        describe('Method Save', function() {
            it('should be able to save without problems', function(done) {
                news.save(done);
            });
        });

        afterEach(function(done) {
            news.remove();
            author.remove();
            done();
        });
    });
});
