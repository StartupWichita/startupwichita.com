'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Event = mongoose.model('Event'),
    _ = require('lodash'),
    Feed = require('feed');


/**
 * Find event by _id
 */
exports.event = function(req, res, next, _id) {
    Event.findOne({ _id: _id }, function(err, event) {
        if (err) return next(err);
        if (!event) return next(new Error('Failed to find event ' + _id));

        req.event = event;

        return next();
    });
};

/**
 * Create an event
 */
exports.create = function(req, res) {
    var event = new Event(req.body);

    event.save(function(err) {
        if (err) return res.send(500, { errors: err.errors, event: event });

        event.tags = req.body.tags;
        return res.jsonp(201, event);
    });
};

/**
 * Update an event
 */
exports.update = function(req, res) {
    var event = req.event;

    event = _.extend(event, req.body);

    event.save(function(error) {
        if (error) return res.send(500, { errors: error.errors, event: event });

        return res.jsonp(event);
    });
};

/**
 * Delete an event
 */
exports.destroy = function(req, res) {
    var event = req.event;

    event.remove(function(err) {
        if (err) return res.send(500, { errors: err.errors, event: event });

        return res.jsonp(204, event);
    });
};

/**
 * Flag the event as a spam entry
 */
exports.spam = function(req, res) {
    var event = req.event;

    Event.update({ _id: event._id }, { $set: { spam: true } }, function(error) {
        if (error) return res.send(500, { errors: error.errors, event: event });

        return res.jsonp(event);
    });
};

/**
 * Show an event
 */
exports.show = function(req, res) {
    res.jsonp(req.event);
};

/**
 * List of Events
 */
exports.all = function(req, res) {
    Event.find({ spam: { $ne: true }}).sort('-title').exec(function(err, events) {
        if (err) return res.send(500, { errors: err.errors });

        return res.jsonp(events);
    });
};

exports.rss = function(req, res) {
    var feed = new Feed({
        title: 'Startup Wichita Events',
        description: 'The most recent events registered with the Startup Wichita site',
        link: 'http://startupwichita.com'
    });

    Event.find({ spam: { $ne: true }}).sort('-created_at').limit(20).exec(function(err, events) {
        if (err) return res.send(500, { errors: err.errors });

        events.forEach(function(event) {
            feed.addItem({
                title: event.title,
                link: event.url,
                description: event.content.substr(0, 100),
                content: event.content,
                date: event.created_at
            });
        });

        return res.send(feed.render('rss-2.0'));
    });
};
