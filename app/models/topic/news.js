'use strict';

var BaseTopicSchema = require('./topic.js'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Topic = mongoose.model('Topic');

var NewsSchema = new BaseTopicSchema(
    {
        people: { type: [Schema.Types.ObjectId], ref: 'User' }
    }
);

Topic.discriminator('News', NewsSchema);
