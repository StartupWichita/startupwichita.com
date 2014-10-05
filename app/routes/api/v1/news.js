'use strict';

// News routes use news controller
var news = require('../../../controllers/news');
var authorization = require('../../middlewares/authorization');
var mongoose = require('mongoose');
var News = mongoose.model('News');

var hasAuthorization = function(req, res, next) {
    News.findOne({ _id: req.newsItem._id }).exec(function(err, news) {
        if (err || !news) return res.send(401, 'Unable to authorize this request');

        return authorization.protectedResource(req, res, next, news.author);
    });
};

module.exports = function(app) {
    app.namespace('/api/v1', function () {
        app.get('/news', news.all);
        app.get('/news.rss', news.rss);
        app.post('/news', authorization.requiresLogin, news.create);
        app.get('/news/:newsItemId', news.show);
        app.put('/news/:newsItemId', authorization.requiresLogin, hasAuthorization, news.update);
        app.del('/news/:newsItemId', authorization.requiresLogin, hasAuthorization, news.destroy);
        app.put('/news/:newsItemId/spam', authorization.requiresLogin, authorization.isAdmin, news.spam);

        // Finish with setting up the newsItemId param
        app.param('newsItemId', news.newsItem);
    });
};
