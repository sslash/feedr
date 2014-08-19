'use strict';
var m = require('../../../../node_modules/mithril');

var feedgetList = {};

feedgetList.controller = function (opts) {
    this.data = opts.data;
};

feedgetList.view = function (ctrl) {
    var data = ctrl.data;

    return m('div.feedgetlist', [
                m('header', m('h4', data.title)),
            ]);
};

module.exports = feedgetList;
