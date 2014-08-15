var createFeedService = require('../services/feed/createFeedService');

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

    },

    delete : function (req, res) {

    },

    update : function (req, res) {

    }
}
