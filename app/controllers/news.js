'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    News = mongoose.model('News'),
    _ = require('lodash'),
    Feed = require('feed');


/**
 * Find newsItem by _id
 */
exports.newsItem = function(req, res, next, _id) {
    News.findOne({ _id: _id })
        .populate('author')
        .exec(function(err, newsItem) {
            if (err) return next(err);
            if (!newsItem) return next(new Error('Failed to find newsItem ' + _id));

            req.newsItem = newsItem;
            return next();
        });
};

/**
 * Create a newsItem
 */
exports.create = function(req, res) {
    var newsItem = new News(req.body);

    newsItem.save(function(err) {
        if (err) return res.send(500, { errors: err.errors, newsItem: newsItem });

        return res.jsonp(201, newsItem);
    });
};

/**
 * Update a newsItem
 */
exports.update = function(req, res) {
    var newsItem = req.newsItem;

    newsItem = _.extend(newsItem, req.body);

    newsItem.save(function(err) {
        if (err) return res.send(500, { errors: err.errors, newsItem: newsItem });

        return res.jsonp(newsItem);
    });
};

/**
 * Delete a newsItem
 */
exports.destroy = function(req, res) {
    var newsItem = req.newsItem;

    newsItem.remove(function(err) {
        if (err) return res.send(500, { errors: err.errors, newsItem: newsItem });

        return res.jsonp(204, newsItem);
    });
};

/**
 * Flag the newsItem as a spam entry
 */
exports.spam = function(req, res) {
    var newsItem = req.newsItem;

    News.update({ _id: newsItem._id }, { $set: { spam: true } }, function(error) {
        if (error) return res.send(500, { errors: error.errors, newsItem: newsItem });

        return res.jsonp(newsItem);
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
    News.find({ spam: { $ne: true }})
        .populate('author')
        .sort('-title')
        .exec(function(err, news) {
            if (err) return res.send(500, { errors: err.errors });

            return res.jsonp(news);
        });
};

exports.rss = function(req, res) {
    var feed = new Feed({
        title: 'Startup Wichita News',
        description: 'The most recent news registered with the Startup Wichita site',
        link: 'http://startupwichita.com'
    });

    News.find({ spam: { $ne: true }})
        .populate('author')
        .sort('-created_at')
        .limit(20)
        .exec(function(err, news) {
            if (err) return res.send(500, { errors: err.errors });

            news.forEach(function(newsItem) {
                feed.addItem({
                    title: newsItem.title,
                    link: newsItem.url,
                    description: newsItem.content.substr(0, 100),
                    content: newsItem.content,
                    date: newsItem.date
                });
            });

            return res.send(feed.render('rss-2.0'));
        });
};
