'use strict';

// Tags routes use tags controller
var tags = require('../../../controllers/tags');

module.exports = function(app) {

    app.namespace('/api/v1', function () {
        app.get('/tags', tags.all);
    });

};
