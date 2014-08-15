'use strict';
var m = require('../../../../node_modules/mithril');

var landing = {};

landing.controller = function () {

};

landing.view = function () {
    return m('div.container.t-center', [
        m('img.bg[src=' + '/images/sanfran.jpg]'),
        m('div.rel.base', [
            m('header.mvl', [
                m('h1.killer', 'Travel Rulette youer'),
                m('p.lead', 'Completely Randomized Travels.')
            ]),
            m('a.btn[href="/#/generate"]', 'Start')
        ])
    ]);
};

module.exports = landing;
