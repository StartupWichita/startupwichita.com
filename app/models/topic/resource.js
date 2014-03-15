var BaseTopicSchema = require('./topic.js'),
    mongoose = require('mongoose'),
    Topic = mongoose.model('Topic');

var ResourceSchema = new BaseTopicSchema({});

Topic.discriminator('Resource', ResourceSchema);
