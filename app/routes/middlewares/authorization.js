'use strict';
var mongoose = require('mongoose'),
    User = mongoose.model('User');
/**
 * Generic require login routing middleware
 */
exports.requiresLogin = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.send(401, { errors: ['User is not authorized'] });
    }
    next();
};

exports.isAdmin = function(req, res, next) {
    User.findOne({ _id: req.user.id }).exec(function(err, user) {
        if (err || !user) return res.send(401, { errors: ['User must be an admin user'] });
        if (user.role !== 'Admin') return res.send(401, { errors: ['User must be an admin user'] });

        return next();
    });
};

exports.protectedResource = function(req, res, next, authorId) {
    var userId = req._passport.session.user;

    User.findOne({ _id: req.user.id }).exec(function(err, user) {
        if (err || !user) return res.send(401, { errors: ['Unable to authorize user'] });

        if (authorId == userId || user.role === 'Admin') return next();

        return res.send(401, { errors: ['You are not authorized to perform this action'] });
    });
};
