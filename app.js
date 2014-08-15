var express = require('express'),
  mongoose = require('mongoose'),
  fs = require('fs'),
  mongoConfig = require('./config/mongoConfig'),
  passport = require('passport'),
  config = require('./config/config');

mongoConfig.connectToMongo();


var modelsPath = __dirname + '/app/models';
fs.readdirSync(modelsPath).forEach(function (file) {
  if (file.indexOf('.js') >= 0) {
    require(modelsPath + '/' + file);
  }
});

var app = express();

require('./config/passport')(passport, config);
require('./config/express')(app, config, passport);


// start server
var server = app.listen(config.port, function() {
    console.log('up and running ' + config.port);
});

var socketIo = require('socket.io')(server);

require('./config/routes')(app, express, passport, socketIo);
