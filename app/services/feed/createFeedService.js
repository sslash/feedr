var _       = require('underscore'),
    mongoose = require('mongoose'),
    Feed    = mongoose.model('Feed'),
    q       = require('q');

/**
* Creates a new feed
*
* A Feed has:
* url
* tags
* owner
*
* list of html-selectors:
*   [
*      [ {'div>div.sap>a', 'the title_0'}], '[ {'main>header.lol>h2', 'the title_1'}]',
*      [ {'div>div.sap>img', 'Image_0'}], '[ {'main>header.lol>img', 'Image_1'}]'
*   ];
*/
module.exports = function (data) {
    var def = q.defer();
    var feed = new Feed(data);
    feed.save(function(err, res) {
        if ( err ) def.reject(err);
        else def.resolve(res);
    });

    return def.promise;
}
