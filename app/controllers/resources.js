'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Resource = mongoose.model('Resource'),
    _ = require('lodash'),
    Feed = require('feed');


/**
 * Find resource by _id
 */
exports.resource = function(req, res, next, _id) {
    Resource.findOne({ _id: _id })
    .populate('author')
    .exec(function(err, resource) {
        if (err) return next(err);
        if (!resource) return next(new Error('Failed to find resource ' + _id));

        req.resource = resource;
        return next();
    });
};

/**
 * Create a resource
 */
exports.create = function(req, res) {
    var resource = new Resource(req.body);

    resource.save(function(err) {
        if (err) return res.send(500, { errors: err.errors, resource: resource });

        return res.jsonp(201, resource);
    });
};

/**
 * Update a resource
 */
exports.update = function(req, res) {
    var resource = req.resource;

    resource = _.extend(resource, req.body);

    resource.save(function(err) {
        if (err) return res.send(500, { errors: err.errors, resource: resource });

        return res.jsonp(resource);
    });
};

/**
 * Delete a resource
 */
exports.destroy = function(req, res) {
    var resource = req.resource;

    resource.remove(function(err) {
        if (err) return res.send(500, { errors: err.errors, resource: resource });

        return res.jsonp(204, resource);
    });
};

/**
 * Flag the resource as a spam entry
 */
exports.spam = function(req, res) {
    var resource = req.resource;

    Resource.update({ _id: resource._id }, { $set: { spam: true } }, function(error) {
        if (error) return res.send(500, { errors: error.errors, resource: resource });

        return res.jsonp(resource);
    });
};


/**
 * Show a resource
 */
exports.show = function(req, res) {
    res.jsonp(req.resource);
};

/**
 * List of Resources
 */
exports.all = function(req, res) {
    Resource.find({ spam: { $ne: true }}).sort('-title').exec(function(err, resources) {
        if (err) return res.send(500, { errors: err.errors });

        return res.jsonp(resources);
    });
};

exports.rss = function(req, res) {
    var feed = new Feed({
        title: 'Startup Wichita Resources',
        description: 'The most recent resources registered with the Startup Wichita site',
        link: 'http://startupwichita.com'
    });

    Resource.find({ spam: { $ne: true }}).sort('-created_at').limit(20).exec(function(err, resources) {
        if (err) return res.send(500, { errors: err.errors });

        resources.forEach(function(resource) {
            feed.addItem({
                title: resource.title,
                link: resource.url,
                description: resource.content.substr(0, 100),
                content: resource.content,
                date: resource.created_at
            });
        });

        return res.send(feed.render('rss-2.0'));
    });
};
