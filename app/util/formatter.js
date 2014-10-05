'use strict';

exports.errorsToArray = function(errors) {
    var messages = [];
    Object.keys(errors).forEach(function(key) {
        messages.push(errors[key].message);
    });

    return messages;
};
