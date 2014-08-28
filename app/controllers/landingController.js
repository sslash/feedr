var path 			 = require('path'),
    basePath         = 'app/templates/';


function render(req, res, tpl) {
    var opts = { layout : 'layout', user : {}};

    if (req.user) {
        console.log('Logged in! ' + req.user.name);
        opts.user = req.user;
    } else {
        console.log('Not logged in! ');
    }

    res.render(tpl, opts);
}
exports.show = function(req, res) {
    render(req, res, 'landing/landing');
};


exports.begin = function (req, res) {
    render(req, res, 'landing/begin');
}
