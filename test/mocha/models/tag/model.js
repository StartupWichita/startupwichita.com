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

            it('should include an uppercase version of the name', function(done) {
                return tag.save(function(err, tag) {
                    should.not.exist(err);
                    tag.name_upper.should.equal('TAG NAME');
                    done();
                });
            });

            it('should fail to save an existing tag', function(done) {
                tag2 = new Tag(tag);
                tag.save();
                return tag2.save(function(err) {
                    should.exist(err);
                    done();
                });
            });

            it('should show an error when try to save without name', function(done) {
                tag.name = '';

                return tag.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
        });

        describe('Method findOrCreate', function() {
            it('should find existing instances by name', function(done) {
                return tag.save(function (err, savedTag) {
                    return Tag.findOrCreate(savedTag.name, function (err, foundTag) {
                        should.not.exist(err);
                        foundTag._id.toString().should.equal(savedTag._id.toString());
                        done();
                    });
                });
            });
            it('should find existing instances by name (case insensitive)', function(done) {
                return tag.save(function (err, savedTag) {
                    return Tag.findOrCreate(savedTag.name.toLowerCase(), function (err, foundTag) {
                        should.not.exist(err);
                        foundTag._id.toString().should.equal(savedTag._id.toString());
                        done();
                    });
                });
            });
            it('should return new instances for unknown names', function(done) {
                return tag.save(function (err, savedTag) {
                    return Tag.findOrCreate('Foo Tag', function (err, foundTag) {
                        should.not.exist(err);
                        foundTag.should.be.an.instanceOf(Tag);
                        foundTag._id.toString().should.not.equal(savedTag._id.toString());
                        foundTag.name.should.equal('Foo Tag');
                        done();
                    });
                });
            });
            it('should handle missing values for name', function(done) {
                return Tag.findOrCreate(undefined, function (err, foundTag) {
                    should.exist(err);
                    should.not.exist(foundTag);
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
