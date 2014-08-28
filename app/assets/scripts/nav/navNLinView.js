'use strict';
var m = require('../../../../node_modules/mithril');

var navNLinView = function() {
    return m('.collapse.navbar-collapse.navbar-right#navbar-collapse',
        m('ul.nav.navbar-nav',[
            m('li', m('a', 'Explore')),
            m('li', m('a', 'About')),
            m('li', m('a', {href:'/auth/facebook'}, 'Login'))
        ])
    );
};


module.exports = navNLinView;
