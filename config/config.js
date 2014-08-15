var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'feedr'
    },
    port: 3000,
    db: 'mongodb://localhost/feedr-development',
    facebook: {
      clientID: "266695190184340",
      clientSecret: "7fd6386fb586646f488ecf01b11a4bbc",
      callbackURL: "http://localhost:3000/auth/facebook/callback"
    }
  },

  test: {
    root: rootPath,
    app: {
      name: 'feedr'
    },
    port: 3000,
    db: 'mongodb://localhost/feedr-test',
    facebook: {
      clientID: "266695190184340",
      clientSecret: "7fd6386fb586646f488ecf01b11a4bbc",
      callbackURL: "http://localhost:3000/auth/facebook/callback"
    }
  },

  production: {
    root: rootPath,
    app: {
      name: 'feedr'
    },
    port: 3000,
    db: 'mongodb://localhost/feedr-production',
    facebook: {
      clientID: "266695190184340",
      clientSecret: "7fd6386fb586646f488ecf01b11a4bbc",
      callbackURL: "http://localhost:3000/auth/facebook/callback"
    }
  }
};

module.exports = config[env];
