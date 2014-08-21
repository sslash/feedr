'use strict';
var m = require('../../../../node_modules/mithril');

var nav = {

    controller : function () {

    },

    view : function (ctrl) {

        var authArr = window.feedrUser.username ?
            [
                m('li', m('a', m('span.icon.ion-email'))),
                m('li', m('a', m('span.icon.ion-gear-b'))),
                m('li', m('a.img', {href:'#'}, m('img.img-circle', {src: window.feedrUser.img, alt:'profile'}))),
                m('li', m('a', {href:'#'}, window.feedrUser.username))
            ]
                :
            m('a.btn btn-face', {href:'/auth/facebook', style: {color: '#fff'}},'Login with Facebook');

        var auth = m('ul.nav.navbar-nav', authArr);

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

                m('.collapse.navbar-collapse.navbar-right#navbar-collapse', [
                    m('form.navbar-form navbar-left', {role: 'search'}, [
                        m('a.btn.btn-trans', {role :'button', href:'/#/manage'}, 'Manage')
                    ]),
                    auth
                ])
            ])
        ]);
    }
};

module.exports = nav;
/*
<div class="container-fluid">
<!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">Feedr.</a>
    </div>


    <div class="collapse navbar-collapse navbar-right" id="bs-example-navbar-collapse-1">
        <form class="navbar-form navbar-left" role="search">
            <a href="/manage" class="btn btn-trans">Manage</a>
      </form>


      <ul class="nav navbar-nav">
            <li><a><span class="icon ion-email"></span></a></li>
            <li><a><span class="icon ion-gear-b"></span></a></li>
            <li><a class="img" href="#"><img src="{{user.profileImgFile}}" alt="profile" class="img-circle"></a></li>
            <li><a href="#">{{user.facebook.name}}</a></li>
        </li>
        </ul>
    </div>
*/
