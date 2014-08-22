//the widget template

// just include the naked template as a component in a view.
'use strict';
var m = require('../../../../node_modules/mithril');

var loginWidget = function() {
    return [
        m('input[placeholder="Username"]'),
        m('input[placeholder="Password"][type="password"]'),
        m('button')
    ];
};

module.exports = loginWidget;
