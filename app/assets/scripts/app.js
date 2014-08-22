'use strict';
var m = window.m = require('../../../node_modules/mithril');
var home = require('./home/home');
var manage = require('./manage/manage');
var nav = require('./nav/nav');
window._ = require('underscore');


m.route.mode = 'hash';

m.module(document.getElementById('nav'), nav);

m.route(document.getElementById('main'), '/', {
    '/': home,
    '/manage': manage
});
