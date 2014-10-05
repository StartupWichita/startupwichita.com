'use strict';

var BaseTopicSchema = require('./topic.js'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Topic = mongoose.model('Topic'),
    validator = require('validator');

var EventSchema = new BaseTopicSchema(
    {
        startTime: { type: Date, required: true },
        endTime: { type: Date, required: true },
        address: { type: String, required: true },
        people: { type: [Schema.Types.ObjectId], ref: 'User' }
    }
);

EventSchema.path('startTime').validate(function(date) {
    return validator.isDate(date);
});

EventSchema.path('endTime').validate(function(date) {
    return validator.isDate(date);
});

Topic.discriminator('Event', EventSchema);
