var createFeedService = require('../services/feed/createFeedService');
var listFeedService = require('../services/feed/listFeedService');

function handleResult (promise, res) {
    promise
    .then(function (result) {
        res.json(result);
    })
    .fail(function (err) {
        res.send(err);
    }).done();
}

module.exports = {
    create : function (req, res) {
        createFeedService(req.body)
        .then(function (result) {
            res.json(result);
        })
        .fail(function (err) {
            res.send(err);
        }).done();
    },

    show : function (req, res) {

    },

    list : function (req, res) {
        handleResult(listFeedService(), res);
    },

    delete : function (req, res) {

    },

    update : function (req, res) {

    }
}
