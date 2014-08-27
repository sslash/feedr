var path 			 = require('path'),
    basePath         = 'app/templates/';

exports.show = function(req, res) {
    var opts = { layout : 'layout', user : {}};

    if (req.user) {
        console.log('Logged in! ' + req.user.name);
        opts.user = req.user;
    } else {
        console.log('Not logged in! ');
    }

    res.render('landing/landing', opts);
};
