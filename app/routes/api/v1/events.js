'use strict';

// Events routes use events controller
var events = require('../../../controllers/events');
var authorization = require('../../middlewares/authorization');
var mongoose = require('mongoose');
var Event = mongoose.model('Event');

var hasAuthorization = function(req, res, next) {
    Event.findOne({ _id: req.event._id }).exec(function(err, event) {
        if (err || !event) return res.send(401, 'Unable to authorize this request');

        return authorization.protectedResource(req, res, next, event.author);
    });
};

module.exports = function(app) {
    app.namespace('/api/v1', function () {
        app.get('/events', events.all);
        app.get('/events.rss', events.rss);
        app.post('/events', authorization.requiresLogin, events.create);
        app.get('/events/:eventId', events.show);
        app.put('/events/:eventId', authorization.requiresLogin, hasAuthorization, events.update);
        app.del('/events/:eventId', authorization.requiresLogin, hasAuthorization, events.destroy);
        app.put('/events/:eventId/spam', authorization.requiresLogin, authorization.isAdmin, events.spam);

        // Finish with setting up the eventId param
        app.param('eventId', events.event);
    });
};
