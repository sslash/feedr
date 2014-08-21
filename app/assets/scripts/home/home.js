'use strict';
var m = require('../../../../node_modules/mithril');
var feedlist = require('../feed/feedlist');

var home = {

    controller : function () {
        this.feedlist = new feedlist.controller();
    },

    view : function () {
        return m('.row.content', [
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
            //
            // <div class="col-sm-2">
            //     <div class="menu">
            //         <ul>
            //             <li class="active">All</li>
            //             <li>Startups</li>
            //             <li>Fitness</li>
            //             <li>Norsk</li>
            //             <li>Soccer</li>
            //             <li>Programming</li>
            //         </ul>
            //
            //         <button class="btn btn-info">Add More</button>
            //
            //         <footer class="footer">
            //             <div class="icon-row">
            //                 <span class="icon ion-social-twitter"></span>
            //                 <span class="icon ion-social-facebook"></span>
            //                 <span class="icon ion-social-googleplus"></span>
            //                 <span class="icon ion-social-reddit"></span>
            //             </div>
            //             <small>&copy;Feedr All Rights Reserved</small>
            //         </footer>
            //     </div>
            // </div>
            //
            // <div class="col-sm-8">
            //     <ul id="feeds"></ul>
            // </div>
            //
            // <div class="col-sm-2">
            //     <div id="widgets" class="affix feedgets">
            //     </div>
            // </div>

    }

};

module.exports = home;
