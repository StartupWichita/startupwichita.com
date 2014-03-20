'use strict';

// Resources routes use resources controller
var resources = require('../../../controllers/resources');
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
        app.get('/resources', resources.all);
        app.post('/resources', authorization.requiresLogin, hasAuthorization, resources.create);
        app.get('/resources/:resourceId', resources.show);
        app.put('/resources/:resourceId', authorization.requiresLogin, hasAuthorization, resources.update);
        app.del('/resources/:resourceId', authorization.requiresLogin, hasAuthorization, resources.destroy);

        // Finish with setting up the resourceId param
        app.param('resourceId', resources.resource);
    });

};
