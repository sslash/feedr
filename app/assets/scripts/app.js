'use strict';
var m = require('../../../node_modules/mithril');
var home = require('./home/home');
var manage = require('./manage/manage');
var nav = require('./nav/nav');


m.route.mode = 'hash';

m.module(document.getElementById('nav'), nav);

m.route(document.getElementById('main'), '/', {
    '/': home,
    '/manage': manage
});
