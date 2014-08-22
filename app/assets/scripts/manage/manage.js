'use strict';
// var m = require('../../../../node_modules/mithril');
var seachFormCmp = require('./searchFormCmp');
var mainLayout = require('../layouts/mainLayout');
var feedThumbsListCmp = require('../feed/feedTHumbsListCmp');

var manage = {

    controller : function () {
        this.searchFormController = new seachFormCmp.controller();
        this.feedThumbsListController = new feedThumbsListCmp.controller();
    },

    view : function(ctrl) {
        return mainLayout([
            seachFormCmp.view(ctrl.searchFormController),
            feedThumbsListCmp.view(ctrl.feedThumbsListController)
        ]);
    }
};

module.exports = manage;
