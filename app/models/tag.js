'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TagSchema = new Schema({
    name: { type: String, default: '', trim: true },
    name_upper: { type: String, default: '', unique: true, index: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

TagSchema.pre('save', function(next) {
    this.updated_at = new Date();
    this.name_upper = this.name.toUpperCase();
    next();
});

/**
 * Validations
 */
TagSchema.path('name').validate(function(name) {
    return name.length;
}, 'Name cannot be blank');

/**
 * Custom methods
 */


/**
 * Static method to either find an existing Tag by name or return a new tag
 * with the name property set. The supplied callback will be provided:
 * 1. Error or null
 * 2. A Tag or null
 */
TagSchema.statics.findOrCreate = function (name, cb) {
    if ('undefined' === typeof name || !name) {
        return cb(new Error('Name must be provided'), null, false);
    }
    var Tag = this;
    Tag.findOne({name_upper: name.toUpperCase()}, function(err, tag) {
        if (!tag) {
            tag = new Tag({ name: name });
        }
        cb(err, tag);
    });
};

mongoose.model('Tag', TagSchema);
