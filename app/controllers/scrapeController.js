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

exports.verifyPath = function (req, res) {
    var url = req.body._url;
    var path = req.body.path;
    var improvedPath = path.split(' ').join(' > ');
    var mimimumForValidPath = 5;

    getHtml(url)
    .then(function($) {
        var occurences = $(path).length;

        // Try if path works with the '>' selector. This is generally better
        var occurences2 = $(improvedPath).length;
        console.log('Path: ' + path+ ': ' + occurences + ', improved: ' + improvedPath + ': '+ occurences2);

        if ( occurences2 >= mimimumForValidPath ) {
            res.json({occurences : occurences2, path : improvedPath});

        } else {
            res.json({occurences : occurences, path : path});
        }
    });
};
