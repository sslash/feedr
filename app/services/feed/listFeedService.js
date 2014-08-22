var _       = require('underscore'),
    mongoose = require('mongoose'),
    Feed    = mongoose.model('Feed'),
    q       = require('q');

module.exports = function () {
    var def = q.defer();
    Feed.find(function(err, res) {
        if ( err ) def.reject(err);
        else def.resolve(res);
    });

    return def.promise;
}
