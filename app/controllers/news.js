'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    News = mongoose.model('News'),
    _ = require('lodash');


/**
 * Find newsItem by id
 */
exports.newsItem = function(req, res, next, id) {
    News.findOne({ _id: id }, function(err, newsItem) {
        if (err) return next(err);
        if (!newsItem) return next(new Error('Failed to find newsItem ' + id));
        req.newsItem = newsItem;
        next();
    });
};

/**
 * Create a newsItem
 */
exports.create = function(req, res) {
    var newsItem = new News(req.body);

    newsItem.save(function(err) {
        if (err) {
            res.send(500, { errors: err.errors, newsItem: newsItem });
        } else {
            res.jsonp(201, newsItem);
        }
    });
};

/**
 * Update a newsItem
 */
exports.update = function(req, res) {
    var newsItem = req.newsItem;

    newsItem = _.extend(newsItem, req.body);

    newsItem.save(function(err) {
        if (err) {
            res.send(500, { errors: err.errors, newsItem: newsItem });
        } else {
            res.jsonp(newsItem);
        }
    });
};

/**
 * Delete a newsItem
 */
exports.destroy = function(req, res) {
    var newsItem = req.newsItem;

    newsItem.remove(function(err) {
        if (err) {
            res.send(500, { errors: err.errors, newsItem: newsItem });
        } else {
            res.jsonp(204, newsItem);
        }
    });
};

/**
 * Show a newsItem
 */
exports.show = function(req, res) {
    res.jsonp(req.newsItem);
};

/**
 * List of News items
 */
exports.all = function(req, res) {
    News.find().sort('-title').exec(function(err, news) {
        if (err) {
            res.send(500, { errors: err.errors });
        } else {
            return res.jsonp(news);
        }
    });
};
