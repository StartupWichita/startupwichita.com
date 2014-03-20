'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    Event = mongoose.model('Event'),
    Tag = mongoose.model('Tag'),
    User = mongoose.model('User');

//Globals
var testEvent, author, tag;

//The tests
describe('Event', function() {
    describe('Model Event:', function() {
        beforeEach(function(done) {
            author = new User({
                name: 'Full name',
                email: 'test@test.com',
                username: 'user',
                password: 'password',
                provider: 'local'
            });

            tag = new Tag({'name': 'example'});

            testEvent = new Event({
                title: 'Example Event',
                tags: [tag],
                content: 'Here is some example content.',
                author: author.id,
                startTime: new Date(),
                endTime: new Date(),
                address: '216 N Mosley, Wichita, KS 67202',
                latlng: [37.68858, -97.32753]
            });

            done();
        });

        describe('Method Save', function() {
            it('should be able to save without problems', function(done) {
                testEvent.save(done);
            });

            it('should show an error when try to save without start time', function(done) {
                testEvent.startTime = '';
                return testEvent.save(function(err) {
                    should.exist(err);
                    done();
                });
            });

            it('should show an error when try to save with invalid start time', function(done) {
                testEvent.startTime = 'This is not a date';
                return testEvent.save(function(err) {
                    should.exist(err);
                    done();
                });
            });

            it('should show an error when try to save without end time', function(done) {
                testEvent.endTime = '';
                return testEvent.save(function(err) {
                    should.exist(err);
                    done();
                });
            });

            it('should show an error when try to save with invalid end time', function(done) {
                testEvent.endTime = 'This is not a date';
                return testEvent.save(function(err) {
                    should.exist(err);
                    done();
                });
            });

            it('should show an error when try to save without address', function(done) {
                testEvent.address = '';
                return testEvent.save(function(err) {
                    should.exist(err);
                    done();
                });
            });

            it('should show an error when try to save without latlng', function(done) {
                testEvent.latlng = '';
                return testEvent.save(function(err) {
                    should.exist(err);
                    done();
                });
            });

            it('should show an error when try to save with invalid latlng values', function(done) {
                testEvent.latlng = ['not numeric', 'not numeric'];
                return testEvent.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
        });

        afterEach(function(done) {
            testEvent.remove();
            author.remove();
            done();
        });
    });
});
