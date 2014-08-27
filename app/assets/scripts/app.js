'use strict';
var m = window.m = require('../../../node_modules/mithril');
var home = require('./home/home');
var landing = require('./landing/landing');
var manage = require('./manage/manage');
// var nav = require('./nav/nav');
window._ = require('underscore');


m.route.mode = 'hash';

// if logged in
// m.module(document.getElementById('nav'), nav);

m.route(document.getElementById('main'), '/', {
    '/' : landing,
    '/home': home,
    '/manage': manage
});
