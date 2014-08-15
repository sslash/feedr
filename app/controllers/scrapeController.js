var request = require('request'),
    q       = require('q'),
    _       = require('underscore'),
    cheerio = require('cheerio');


function getHtml (url) {
    var def = q.defer();
    // The structure of our request call
    // The first parameter is our URL
    // The callback function takes 3 parameters, an error, response status code and the html

    request(url, function(err, response, html){
        if(err) { def.reject(err);}
        def.resolve(cheerio.load(html));
    });

    return def.promise;
}

function send(res, opts) { res.send(opts); }

function parseAndSend(res, url, opts) {
    getHtml(url)
    .then(function($) {
        send(res, parse($, url, opts));
    });
}

function parse($, url, opts) {

    opts.root = opts.root || 'article';
    opts.link = opts.link || '> h2 > a';

    return {


        // common header title
        header:$('title').text(),

        // banner icon
        icon : url + 'favicon.ico',

        // filter articles: header, link and image
        articles: $(opts.root).map(function(i, article) {

            // top article tag
            var $a = $(article);

            // sometimes links are deep down in the article tag
            // use find to filter down
            var $link = opts.link ? $a.find(opts.link) : $a;

            // either have a specific img el, or a plain first image find
            var $img = opts.img ?
                $a.find(opts.img.el).attr(opts.img.attr) :
                $a.find('> img').attr('src')


            return {
                url : $link.attr('href'),
                val : $link.text(),
                img : $img
            };
        }).get()
    };
}

exports.mozillaHacks = function(req, res) {
    parseAndSend(res, 'http://hacks.mozilla.org/articles/', {
        root : 'main li'
    });
};

exports.lifeHackerDev = function(req, res) {
    parseAndSend(res, 'http://lifehacker.com/tag/programming', {
        link : 'h1 > a'
    });
};

exports.infoworld = function(req, res) {
    parseAndSend(res, 'http://www.infoworld.com/news', {
        root : '#news li',
        link : 'h1 > a'
    });
};

exports.hackerNews = function (req, res) {
    parseAndSend(res, 'http://news.ycombinator.com/', {
        root :'td.title:not([valign])',
        link : 'a'
    });
};


exports.devNews = function (req, res) {
    parseAndSend(res, 'http://venturebeat.com/category/dev/', {
        img : { el : '> img', attr : 'data-src' }
    });
};

exports.smashing = function(req, res) {
    parseAndSend(res, 'http://www.smashingmagazine.com/', {});
}



// Custom send example
//
// exports.devNews = function (req, res) {
//     var url = 'http://venturebeat.com/category/dev/';
//     getHtml(url)
//     .then(function($) {
//
//         send(res, {
//             header:$('title').text(),
//             icon : url + 'favicon.ico',
//
//             headings : $('article').map( function(i, a) {
//                 var $a = $(a);
//                 var $link = $a.find('> h2 > a');
//                 return {
//                     url : $link.attr('href'),
//                     val : $link.text(),
//                     img : $a.find('> img').attr('data-src')
//                 };
//             }).get()
//         });
//     })
//     .fail(function(e) { res.send(e); }).done();
// };
