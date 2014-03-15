'use strict';

// Tags routes use tags controller
var tags = require('../controllers/tags');
var authorization = require('./middlewares/authorization');

// Tags very redundantly redundant authorization helpers
// TO DO - Need to add Admin authorization only
// Left here as a filler for admin authorization 
var hasAuthorization = function(req, res, next) {
	if (req.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/tags', tags.all);
    app.post('/tags', authorization.requiresLogin, hasAuthorization, tags.create);
    app.get('/tags/:tagId', tags.show);
    app.put('/tags/:tagId', authorization.requiresLogin, hasAuthorization, tags.update);
    app.del('/tags/:tagId', authorization.requiresLogin, hasAuthorization, tags.destroy);

    // Finish with setting up the tagId param
    app.param('tagId', tags.tag);

};