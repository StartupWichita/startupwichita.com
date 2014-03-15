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
        latlng: { type: Array, required: true, index: '2dsphere', sparse: true },
        people: { type: [Schema.Types.ObjectId], ref: 'User' }
    }
);

EventSchema.path('startTime').validate(function(date) {
    return validator.isDate(date);
});

EventSchema.path('endTime').validate(function(date) {
    return validator.isDate(date);
});

EventSchema.path('latlng').validate(function(latlng) {
    return latlng instanceof Array && validator.isFloat(latlng[0]) && validator.isFloat(latlng[1]);
});

Topic.discriminator('Event', EventSchema);
