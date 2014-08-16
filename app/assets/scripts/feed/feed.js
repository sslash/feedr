'use strict';
var m = require('../../../../node_modules/mithril');

var feed = {};

feed.controller = function (opts) {

    this.article = opts.article;
    this.data = opts.data;
};

feed.view = function (ctrl) {
    var article = ctrl.article;
    var data = ctrl.data;

    return m('div.feed', [
                m('div.header', [
                    m('strong.title', data.title),
                    m('div.tags', data.tags.map(function(tag) {
                            return m('span.label.label-tag', tag);
                    }))
                ]),
                m('h3', article.header.text),
                m('p', article.ingress.text),
                (article.image.src ? m('img', {src : article.image.src, height: '100'}) : null)
            ]);
};

module.exports = feed;
