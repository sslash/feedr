var request         = require('request'),
    q               = require('q'),
    _               = require('underscore'),
    cheerio         = require('cheerio'),
    util            = require('util'),
    EventEmitter    = require('events').EventEmitter;

// exported object
var ScrapeService = function () {
    EventEmitter.call(this);
}

util.inherits(ScrapeService, EventEmitter);

ScrapeService.prototype.scrapeFeed = function(feed) {

    var dat = this;

    // get the html from external server
    this.getHtml(feed.url)
    .then(function($) {

        var scrapedData = dat.scrape($, feed);
        return this.emit.call(dat, 'html:parsed', scrapedData);

    }.bind(this))

    // failed to fetch or parse feed
    .fail(function (e){
        throw e;
    }).done();
};

ScrapeService.prototype.getHtml = function (url) {
    var def = q.defer();

    request(url, function(err, response, html){
        if (err) def.reject(err);
        else def.resolve(cheerio.load(html));
    });

    return def.promise;
}

ScrapeService.prototype.scrape = function ($, feed) {
    // return {
    //
    //     // common header title
    //     header:$('title').text(),
    //
    //     // banner icon
    //     icon : feed.url + 'favicon.ico',
    //
    //     headers : this.getHeaders($, $(feed.selectors[0][0].tag)),
    //
    //     ingress : this.getIngress($, $(feed.selectors[2][0].tag)),
    //
    //     date : this.getDate($, $(feed.selectors[3][0].tag))
    // };

    var headerTag = feed.selectors[0][0].tag;
    var imageTag = feed.selectors[1][0].tag;
    var ingressTag = feed.selectors[2][0].tag;
    var dateTag = feed.selectors[3][0].tag;

    var articles = [];
    $(feed.articleContainer).each(function(i, $article) {
        var $header = $($article).find(headerTag);
        var $image = $($article).find(imageTag);
        var $ingress = $($article).find(ingressTag);
        var $date = $($article).find(dateTag);

        if (!$header.length) return;
        if(!$image.length && !$ingress.length) return;


        articles.push({
            header : {
                url : $header.attr('href'),
                text : $header.text()
            },
            image : {
                src : $image.attr('src')
            },
            ingress : {
                text : $ingress.text()
            },
            date : {
                text : $date.text()
            }
        });
    });

    return articles;
}

ScrapeService.prototype.getHeaders = function ($, $headerSelector) {
    return $headerSelector.map(function (i, t) {
        var $t = $(t);
        return {
            text : $t.text(),
            url : $t.attr('href')
        };
    }).get();
}

ScrapeService.prototype.getIngress = function ($, $ingressSelector) {
    return $ingressSelector.map(function(i, t) {
        var $t = $(t);
        return {
            text : $t.text()
        };
    }).get();
}

ScrapeService.prototype.getDate = function ($, $dateSelector) {
    return $dateSelector.map(function(i, t) {
        var $t = $(t);
        return {
            text : $t.text()
        };
    }).get();
}

module.exports = ScrapeService;
