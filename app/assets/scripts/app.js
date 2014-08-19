'use strict';
var m = require('../../../node_modules/mithril');
var jsonp = require('./libs/jsonp');
var Feed = require('./feed/feed');
var Feedget = require('./feedgets/feedget');
var FeedgetList = require('./feedgets/feedgetList');

// m.route.mode = 'hash';
// m.route(document.querySelector('#feeds'), '/', {
//      '/': landing
// });

var io = window.io;
var socket = io.connect('http://localhost:3000');

var feeds = document.getElementById('feeds');

var getContainer = function () {
    var container = document.createElement('div');
    container.setAttribute('style', 'width:48%;display:inline-block');
    feeds.appendChild(container);
    return container;
};

var render = function (article, data) {
    var ctrl = new Feed.controller({article: article, data : data});
    var view = new Feed.view(ctrl);
    m.render(getContainer(), view);
};

var renderRest = function (data) {
    data.articles.slice(1, data-length).forEach(function(article) {
        render(article, data);
    });
};

// feeds
socket.on('data', function (widgets) {

    render(widgets.articles[0], widgets);
    var startRenderTime = Math.random() * 1000;

    setTimeout(function () {
        renderRest(widgets);
    }, startRenderTime);
});


// socket.on('data:feeds')

var widgets = document.getElementById('widgets');

var getFeedgetContainer = function () {
    var container = document.createElement('div');
    widgets.appendChild(container);
    return container;
};

function onSuccess (res) {

    // TODO: this should be a mithril view container instead
    var listContainer = getFeedgetContainer();
    var listCtrl = new FeedgetList.controller({data : {title : 'Hacker News'}});
    var listview = new FeedgetList.view(listCtrl);

    m.render(listContainer, listview);

    res.items.forEach(function (item) {
        var container = getFeedgetContainer();

        var ctrl = new Feedget.controller({data : item});
        var view = new Feedget.view(ctrl);
        m.render(container, view);
    });
}

jsonp.send('http://api.ihackernews.com/page?format=jsonp&callback=onSuccess', {
    callbackName: 'onSuccess',
    onSuccess: onSuccess,
    onTimeout: function(){
        console.log('timeout!');
    },
    timeout: 5
});
