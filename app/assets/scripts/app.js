'use strict';
var m = require('../../../node_modules/mithril');
// var landing = require('./landing/landing');

m.route.mode = 'hash';
// m.route(document.querySelector('#main'), '/', {
//     '/': landing
// });
console.log('hello..');

var io = window.io;
var socket = io.connect('http://localhost:3000');

socket.on('data', function (data) {
    var list = document.getElementById('feeds');

    data.forEach(function(article) {
        var node = document.createElement('LI');

        var h = document.createElement('H1');
        var ht = document.createTextNode(article.header.text);
        h.appendChild(ht);

        var p = document.createElement(p);
        var pt = document.createTextNode(article.ingress.text);
        p.appendChild(pt);

        var i = document.createElement('img');
        i.setAttribute('src', article.image.src);
        i.setAttribute('height', '100');


        node.appendChild(h);
        node.appendChild(p);
        node.appendChild(i);
        list.appendChild(node);
    });
});
