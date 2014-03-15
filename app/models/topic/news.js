'use strict';

var BaseTopicSchema = require('./topic.js'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Topic = mongoose.model('Topic'),
    validator = require('validator');

var NewsSchema = new BaseTopicSchema(
    {
        date: { type: Date, required: true },
        people: { type: [Schema.Types.ObjectId], ref: 'User' }
    }
);

NewsSchema.path('date').validate(function(date) {
    return validator.isDate(date);
});

Topic.discriminator('News', NewsSchema);
