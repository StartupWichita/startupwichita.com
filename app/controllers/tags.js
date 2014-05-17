'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Tag = mongoose.model('Tag'),
    _ = require('lodash');

/**
 * Sanitize tags before returning
 */
var sanitize = function(tag) {
    var result;

    if (tag && typeof tag.length !== 'undefined') {
        result = [];

        tag.forEach(function(tag) {
            var sanitizedTag = {
                _id: tag._id,
                name: tag.name,
                created_at: tag.created_at,
                updated_at: tag.updated_at
            };
            result.push(sanitizedTag);
        });
    } else {
        result = {
            _id: tag._id,
            name: tag.name,
            created_at: tag.created_at,
            updated_at: tag.updated_at
        };
    }

    return result;
};

/**
 * Find tag by _id
 */
exports.tag = function(req, res, next, _id) {
    Tag.findOne({_id: _id}, function(err, tag) {
        if (err) return next(err);
        if (!tag) return next(new Error('Failed to load tag ' + _id));
        req.tag = tag;
        next();
    });
};

/**
 * Create a tag. This attempts to be smart and will update an existing tag if
 * you use an existing name.
 */
exports.create = function(req, res) {
    var tag = new Tag(req.body);

    tag.save(function(err) {
        if (err) {
            res.send(500, { errors: err.errors, tag: sanitize(tag) });
        } else {
            res.jsonp(201, sanitize(tag));
        }
    });
};

/**
 * Update a tag
 */
exports.update = function(req, res) {
    var tag = req.tag;

    tag = _.extend(tag, req.body);

    tag.save(function(err) {
        if (err) {
            res.send(500, { errors: err.errors, tag: sanitize(tag) });
        } else {
            res.jsonp(sanitize(tag));
        }
    });
};

/**
 * Delete a tag
 */
exports.destroy = function(req, res) {
    var tag = req.tag;

    tag.remove(function(err) {
        if (err) {
            return res.send(500, { errors: err.errors, tag: sanitize(tag) });
        } else {
            res.jsonp(204, sanitize(tag));
        }
    });
};

/**
 * Show a tag
 */
exports.show = function(req, res) {
    res.jsonp(sanitize(req.tag));
};

/**
 * List of Tags
 */
exports.all = function(req, res) {
    Tag.find().sort('-name').exec(function(err, tags) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(sanitize(tags));
        }
    });
};
