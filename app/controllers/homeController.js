var path            = require('path'),
    basePath        = 'app/templates/home/',
    socketService   = require('../services/socket/socketService');

module.exports = function (socket) {

    return {

        home : function (req, res) {

            var opts = { layout : '../layout', user : {}};

            if (req.user) {
                console.log('Logged in! ' + req.user.name);
                opts.user = req.user;
                res.render(path.join(process.cwd(), basePath, 'indexLIN' ), opts);

                socketService.createConnection(socket, req.user);
            } else {
                console.log('Not logged in! ');
                res.render(path.join(process.cwd(), basePath,'index' ), opts);
            }
        },

        styleguide : function (req, res) {
            res.sendFile(path.join(process.cwd(), 'app/assets/styleguide/index.html'));
        }
    };
}
