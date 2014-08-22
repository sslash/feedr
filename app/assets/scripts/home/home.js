'use strict';
var m = require('../../../../node_modules/mithril');
var mainLayout = require('../layouts/mainLayout');
var feedlist = require('../feed/feedlist');

var home = {

    controller : function () {
        this.feedlist = new feedlist.controller();
    },

    view : function () {
        return mainLayout([
            m('.col-sm-2', [
                m('.menu', [
                    m('ul', [
                        m('li.active', 'All'),
                        m('li', 'Startups'),
                        m('li', 'Fitness'),
                        m('li', 'Norsk'),
                        m('li', 'Soccer'),
                        m('li', 'Programming'),
                    ]),
                    m('button.btn.btn-info', 'Add More'),
                    m('footer.footer', [
                        m('.icon-row', [
                            m('span.icon.ion-social-twitter'),
                            m('span.icon.ion-social-facebook'),
                            m('span.icon.ion-social-googleplus'),
                            m('span.icon.ion-social-reddit')
                        ]),
                        m('small', '&copy;Feedr All Rights Reserved')
                    ])
                ])
            ]),
            m('.col-sm-8', [
                m('ul#feeds')
            ]),
            m('.col-sm-2', [
                m('#widgets.affix.feedgets', feedlist.view(feedlist.controller))
            ])
        ]);
    }
};

module.exports = home;
