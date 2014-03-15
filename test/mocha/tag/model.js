'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    Tag = mongoose.model('Tag');

//Globals
var tag, tag2;

//The tests
describe('<Unit Test>', function() {
    describe('Model Tag:', function() {
        beforeEach(function(done) {
            tag = new Tag({
                name: 'Tag name'
            });
            tag2 = new Tag(tag);
            done();
           
        });

        describe('Method Save', function() {
					
            it('should begin without the test tag', function(done) {
                Tag.find({ name: 'Tag name' }, function(err, tags) {
                    tags.should.have.length(0);
                    done();
                });
			});
					
            it('should be able to save without problems', function(done) {
                return tag.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });
						
			it('should fail to save an existing tag', function(done) {
                tag.save();
                return tag2.save(function(err) {
                    should.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without name', function(done) {
                tag.name = '';

                return tag.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
        });

        afterEach(function(done) {
            tag.remove();
            done();
        });
    });
});