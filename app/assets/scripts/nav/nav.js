'use strict';
var m = require('../../../../node_modules/mithril');
var nLinView = require('./navNLinView');

var nav = {

    controller : function () {},

    view : function (ctrl) {

        // var authArr = window.feedrUser.username ?
        //     [
        //         m('li', m('a', m('span.icon.ion-email'))),
        //         m('li', m('a', m('span.icon.ion-gear-b'))),
        //         m('li', m('a.img', {href:'#'}, m('img.img-circle', {src: window.feedrUser.img, alt:'profile'}))),
        //         m('li', m('a', {href:'#'}, window.feedrUser.username))
        //     ]
        //         :
        //     m('a.btn btn-face', {href:'/auth/facebook', style: {color: '#fff'}},'Login with Facebook');

        // var auth = m('ul.nav.navbar-nav', authArr);

        return m('nav.navbar.navbar-default.navbar-fixed-top', {role:'navigation'}, [

            m('.container-fluid', [
                m('navbar-header', [
                    m('button.navbar-toggle', {'type':'button', 'data-toggle':'collapse','data-target':'navbar-collapse'}, [
                        m('span.sr-only', 'Toggle Navigation'),
                        m('span.icon-bar'),
                        m('span.icon-bar'),
                        m('span.icon-bar')
                    ]),
                    m('a.navbar-brand', {href:'#'}, 'Feedr.')
                ]),
                nLinView()

                // m('.collapse.navbar-collapse.navbar-right#navbar-collapse', [
                //     m('form.navbar-form navbar-left', {role: 'search'}, [
                //         m('a.btn.btn-trans', {role :'button', href:'/#/manage'}, 'Manage')
                //     ]),
                //     auth
                // ])
            ])
        ]);
    }
};

module.exports = nav;
