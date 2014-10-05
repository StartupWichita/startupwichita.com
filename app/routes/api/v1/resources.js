'use strict';

// Resources routes use resources controller
var resources = require('../../../controllers/resources');
var authorization = require('../../middlewares/authorization');
var mongoose = require('mongoose');
var Resource = mongoose.model('Resource');

var hasAuthorization = function(req, res, next) {
    Resource.findOne({ _id: req.resource._id }).exec(function(err, resource) {
        if (err || !resource) return res.send(401, 'Unable to authorize this request');

        return authorization.protectedResource(req, res, next, resource.author);
    });
};

module.exports = function(app) {

    app.namespace('/api/v1', function () {
        app.get('/resources', resources.all);
        app.get('/resources.rss', resources.rss);
        app.post('/resources', authorization.requiresLogin, resources.create);
        app.get('/resources/:resourceId', resources.show);
        app.put('/resources/:resourceId', authorization.requiresLogin, hasAuthorization, resources.update);
        app.del('/resources/:resourceId', authorization.requiresLogin, hasAuthorization, resources.destroy);
        app.put('/resources/:resourceId/spam', authorization.requiresLogin, authorization.isAdmin, resources.spam);

        // Finish with setting up the resourceId param
        app.param('resourceId', resources.resource);
    });

};
