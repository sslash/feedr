var mongoConfig     = require('./mongoConfig'),
    pkg             = require('../package'),
    serveStatic     = require('serve-static'),
    compression     = require('compression'),
    favicon         = require('serve-favicon'),
    logger          = require('morgan'),
    bodyParser      = require('body-parser'),
    methodOverride  = require('method-override'),
    cookieParser    = require('cookie-parser'),
    session         = require('express-session'),
    hbs             = require('express-hbs');

module.exports = function(app, config, passport) {
    app.use(compression());
    app.use(serveStatic(config.root + '/public'));
    app.use(serveStatic(config.root + '/app'));
    app.set('port', config.port);

    // views config
    app.engine('hbs', hbs.express3({
        partialsDir: __dirname + '../app/templates'
    }));
    app.set('view engine', 'hbs');
    app.set('views', __dirname + '../app/templates');

    app.use(favicon(config.root + '/app/assets/favicon.ico'));
    app.use(logger('dev'));
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }))

    // parse application/json
    app.use(bodyParser.json())

    // parse application/vnd.api+json as json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
    app.use(methodOverride());

    app.use(cookieParser());

    var mongoStore = require('connect-mongo')(session);

    app.use(session({
        secret: pkg.name,
        store: new mongoStore({
            url: mongoConfig.getDbUrl(),
            collection : 'sessions'
        }),
        saveUninitialized: true,
        resave: true
    }));

    // use passport session
    app.use(passport.initialize());
    app.use(passport.session());
};
