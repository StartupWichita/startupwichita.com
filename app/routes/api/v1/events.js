'use strict';

// Events routes use events controller
var events = require('../../../controllers/events');
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
        app.get('/events', events.all);
        app.post('/events', authorization.requiresLogin, hasAuthorization, events.create);
        app.get('/events/:eventId', events.show);
        app.put('/events/:eventId', authorization.requiresLogin, hasAuthorization, events.update);
        app.del('/events/:eventId', authorization.requiresLogin, hasAuthorization, events.destroy);

        // Finish with setting up the eventId param
        app.param('eventId', events.event);
    });
};
