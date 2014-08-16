//TODO: the problem is that the html fetched is different from what was parsed in chrome. Have to figure out that
// maybe, drag the user to feedr. open up an iframe with the requested url. on click, send the click to the server, which will try and parse it, and send the unique path back.

var mongoose        = require('mongoose'),
    ScrapeService   = require('../scrape/scrapeService'),
    Feed            = mongoose.model('Feed');

module.exports = {

    createConnection : function (io, user) {
        console.log('creating!!');
        io.on('connection', this.fetchAndScrapeFeeds.bind(this));
    },

    fetchAndScrapeFeeds : function (socket) {
        var scrapeService = new ScrapeService();

        Feed.find(function(err, res) {
            if ( err ) return def(err);

            console.log('Feeds: ' + res.length);
            res.forEach(function (feed) {
                scrapeService.scrapeFeed(feed);
            });

            scrapeService.on('html:parsed', function (data) {
                socket.emit('data', data);
            });
        });
    }

}
