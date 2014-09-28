'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Topic = mongoose.model('Topic');

/**
 * List of Tags
 */
exports.all = function(req, res) {
    Topic.aggregate({ $project: { tags: 1, _id: 0 }})
    .unwind('tags')
    .group({ _id: '$tags' })
    .exec(function(err, results) {
        if (err) return res.send(500, { errors: err.errors });

        var tags = results.map(function (tag) { return tag._id; });

        return res.jsonp(200, tags.sort());
    });
};
