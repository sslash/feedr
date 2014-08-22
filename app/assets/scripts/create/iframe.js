/* global m */
'use strict';

var iframe = {

    // model

    controller : function (url) {
        this.url = m.prop(url);
    },
    view : function(ctrl) {
        return m('iframe', {src: ctrl.url(), frameborder: 0, width:'100%', height: '600px'});
    }
};

module.exports = iframe;
