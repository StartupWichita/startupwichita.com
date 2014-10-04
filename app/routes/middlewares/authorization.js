'use strict';
var mongoose = require('mongoose'),
    User = mongoose.model('User');
/**
 * Generic require login routing middleware
 */
exports.requiresLogin = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

exports.isAdmin = function(req, res, next) {
    User.findOne({ _id: req.user.id }).exec(function(err, user) {
        if (err || !user) return res.send(401, 'User must be an admin user');
        if (user.role !== 'Admin') return res.send(401, 'User must be an admin user');

        return next();
    });
};
