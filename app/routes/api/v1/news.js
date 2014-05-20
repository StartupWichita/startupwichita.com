'use strict';

// News routes use news controller
var news = require('../../../controllers/news');
var authorization = require('../../middlewares/authorization');

// @TODO - Need to add Admin authorization only
var hasAuthorization = function(req, res, next) {
    if (req.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {
    app.namespace('/api/v1', function () {
        app.get('/news', news.all);
        app.get('/news.rss', news.rss);
        app.post('/news', authorization.requiresLogin, hasAuthorization, news.create);
        app.get('/news/:newsItemId', news.show);
        app.put('/news/:newsItemId', authorization.requiresLogin, hasAuthorization, news.update);
        app.del('/news/:newsItemId', authorization.requiresLogin, hasAuthorization, news.destroy);

        // Finish with setting up the newsItemId param
        app.param('newsItemId', news.newsItem);
    });
};
