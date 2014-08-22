'use strict';
var m = require('../../../../node_modules/mithril');
var formLayout = require('../layouts/formLayout');
var iframe = require('../create/iframe');


var searchFormCmp = {

    // model

    controller : function () {
        this.url = m.prop('');

        this.onSubmit = function (e) {
            e.preventDefault();
            console.log('sappern ' + this.url());
            var ctrl = new iframe.controller(this.url());
            var view = iframe.view(ctrl);

            m.render(document.getElementById('iframe'), view);

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
