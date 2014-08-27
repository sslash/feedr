'use strict';
var m = require('../../../../node_modules/mithril');
var formLayout = require('../layouts/formLayout');
// var iframe = require('../create/iframe');



var searchFormCmp = {

    // model

    controller : function () {
        this.url = m.prop('');

        this.onSubmit = function (e) {
            e.preventDefault();
            console.log('sappern ' + this.url());
            // problem:
            // you'd want to fetch the site here, and create the feed from here.
            // but it is not possible to set click listeners inside the cross domain iframe
            // and its not possible to inject scripts into this cross domain ifram either
            // so the only possibility is to use the chrome plugin for this.

        }.bind(this);
    },
    view : function(ctrl) {
        return m('.container',
            formLayout(
                m('.t-center', [
                    m('label.sr-only', {for:'search-url'}),
                    m('input#search-url.form-control.klr-search',
                        {type:'search', placeholder: 'Insert Url', onchange: m.withAttr('value', ctrl.url) }),
                    m('#iframe')
                ]), ctrl.onSubmit
            )
        );
    }
};

module.exports = searchFormCmp;
