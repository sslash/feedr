var path 			 = require('path');

module.exports = function(app, express, passport, socket) {

	var userController   = require('../app/controllers/userController'),
		// feedController	 = require('../app/controllers/feedController'),
		// scrapeController = require('../app/controllers/scrapeController'),
		// homeController = require('../app/controllers/homeController')(socket),
		landingController = require('../app/controllers/landingController'),
		auth 			 = require('./middlewares/authorization');

	var router = express.Router();

	// router.route('/feeds')
	// 	.post(feedController.create)
	// 	.get(feedController.list);
	// router.route('/feeds/:id')
	// 	.get(feedController.show)
	// 	.put(feedController.update)
	// 	.delete(feedController.delete);

	router.get('', landingController.show);
	router.get('/', landingController.show);
	router.get('/begin', landingController.begin);
	// router.post('/scrape/verifyPath', scrapeController.verifyPath);
	// router.get('/home', homeController.home);
	// router.get('/styleguide', homeController.styleguide);
	router.get('/login', userController.login);
	router.get('/logout', userController.logout);

	router.get('/auth/facebook',
		passport.authenticate('facebook', {
			scope: [ 'email', 'user_about_me'],
			failureRedirect: '/'
		}),
		userController.signin
	);

	router.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
			failureRedirect: '/'
		}), userController.authCallback);


	app.use('/', router);

};
