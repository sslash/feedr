'use strict';
var m = require('../../../node_modules/mithril');
var Feed = require('./feed/feed');

// m.route.mode = 'hash';
// m.route(document.querySelector('#feeds'), '/', {
//      '/': landing
// });

var io = window.io;
var socket = io.connect('http://localhost:3000');

var feeds = document.getElementById('feeds');

socket.on('data', function (data) {
    var container = document.createElement('div');
    container.setAttribute('style', 'width:20%;display:inline-block');
    feeds.appendChild(container);

    data.articles.forEach(function(article) {
        var ctrl = new Feed.controller({article: article, data : data});
        var view = new Feed.view(ctrl);
        m.render(container, view);
    });
});
