// container for a form. Extend this to use with different forms around the app

'use strict';
var m = require('../../../../node_modules/mithril');

var formLayout = function(content, onSubmit) {
    return m('form', {role: 'form', onsubmit:onSubmit},
                m('.row', content)
            );
};


module.exports = formLayout;
