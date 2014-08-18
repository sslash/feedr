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

// Receive a number of articles.
socket.on('data', function (data) {

    render(data.articles[0], data);
    var startRenderTime = Math.random() * 1000;

    setTimeout(function () {
        renderRest(data);
    }, startRenderTime);
});
