// Component for displaying a list of feed thumbnails

/* global _: false */
'use strict';
var m = require('../../../../node_modules/mithril');

var feedThumbsListCmp = {

    FeedList : function () {
        return m.request({method: 'GET', url: '/feeds'});
    },

    controller : function () {
        this.feeds = feedThumbsListCmp.FeedList();
    },

    view : function(ctrl) {
        return m('.container.t-center',
            _.map(ctrl.feeds(), function(feed) {
                return m('.col-sm-2',
                    m('.feed-thumb',
                            m('a', {href: feed.url}, feed.title)
                    ));
               })
           );
    }
};

module.exports = feedThumbsListCmp;
