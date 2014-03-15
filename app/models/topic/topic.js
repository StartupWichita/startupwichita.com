'use strict';

var mongoose = require('mongoose'),
    util = require('util'),
    Schema = mongoose.Schema,
    validator = require('validator');

function BaseTopicSchema() {
    Schema.apply(this, arguments);

    this.add({
        title: { type: String, required: true },
        tags: { type: [Schema.Types.ObjectId], ref: 'Tag' },
        content: { type: String, required: true },
        author: { type: Schema.Types.ObjectId, ref: 'User' },
        created_at: { type: Date, default: Date.now },
        updated_at: { type: Date, default: Date.now },
        url: String,
        image: String,
    });
}

util.inherits(BaseTopicSchema, Schema);

module.exports = BaseTopicSchema;

var TopicSchema = new BaseTopicSchema({}, { collection: 'topics' });

TopicSchema.pre('save', function(next) {
    this.updated_at = new Date();
    next();
});

TopicSchema.path('url').validate(function(url) {
    return (validator.isNull(url) || validator.isURL(url, true, true));
});

mongoose.model('Topic', TopicSchema);
