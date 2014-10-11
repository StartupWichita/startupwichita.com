'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    Topic = mongoose.model('Topic'),
    User = mongoose.model('User');

//Globals
var topic, topic2, author, tag;

//The tests
describe('Topic', function() {
    describe('Model Topic:', function() {
        beforeEach(function(done) {
            author = new User({
                name: 'Full name',
                email: 'test@test.com',
                password: 'password',
                provider: 'local'
            });

            tag = 'tag1';

            topic = new Topic({
                title: 'Example Topic',
                tags: [tag],
                content: 'Here is some example content.',
                author: author._id
            });
            topic2 = new Topic(topic);

            done();
        });

        describe('Method Save', function() {
            it('should begin without the test topic', function(done) {
                Topic.find({ title: 'Example Topic' }, function(err, topics) {
                    topics.should.have.length(0);
                    done();
                });
            });

            it('should be able to save without problems', function(done) {
                topic.save(done);
            });

            it('should fail to save an existing topic again', function(done) {
                topic.save();
                return topic2.save(function(err) {
                    should.exist(err);
                    done();
                });
            });

            it('should show an error when try to save without title', function(done) {
                topic.title = '';
                return topic.save(function(err) {
                    should.exist(err);
                    done();
                });
            });

            it('should show an error when try to save without content', function(done) {
                topic.content = '';
                return topic.save(function(err) {
                    should.exist(err);
                    done();
                });
            });

            it('should show an error when try to save without author', function(done) {
                topic.author = '';
                return topic.save(function(err) {
                    should.exist(err);
                    done();
                });
            });

            it('should update the updated_at value for each save', function(done) {
                var updated_at = topic.updated_at;
                return topic.save(function(err, updatedTopic) {
                    updatedTopic.updated_at.should.not.exactly(updated_at);
                    done();
                });
            });

            it('should show an error when try to save non-url value for url', function(done) {
                topic.url = 'This is not a url';
                return topic.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
        });

        afterEach(function(done) {
            topic.remove();
            author.remove();
            done();
        });
    });
});
