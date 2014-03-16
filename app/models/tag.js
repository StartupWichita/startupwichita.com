'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Tag Schema
 */
var TagSchema = new Schema({
    name: {
        type: String,
        default: '',
        trim: true
    },
    primary: {
        type: Boolean,
        default: false
    }
});

/**
 * Validations
 */
TagSchema.path('name').validate(function(name) {
    return name.length;
}, 'Name cannot be blank');


mongoose.model('Tag', TagSchema);
