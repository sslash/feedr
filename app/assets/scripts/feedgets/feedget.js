'use strict';
var m = require('../../../../node_modules/mithril');

var feedget = {};

feedget.controller = function (opts) {
    this.data = opts.data;
};

feedget.view = function (ctrl) {
    var data = ctrl.data;

    return m('div.feedget', [
                m('header', m('a.strong', {href:  data.url}, data.title)),
                m('small', 'Posted: ' + data.postedAgo)
            ]);
};

module.exports = feedget;
