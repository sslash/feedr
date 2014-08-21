var path 			 = require('path');

module.exports = function(app, express, passport, socket) {

	var userController   = require('../app/controllers/userController'),
		feedController	 = require('../app/controllers/feedController'),
		scrapeController = require('../app/controllers/scrapeController'),
		homeController = require('../app/controllers/homeController')(socket),
		auth 			 = require('./middlewares/authorization');

	// app.use(function(req, res) {
	// 	res.status(404).render(process.cwd() + '/app/templates/404', { title: '404' });
	// });


	// router.get('/feed/hackerNews', scrapeController.hackerNews);
	// router.get('/feed/devNews', scrapeController.devNews);
	// router.get('/feed/lifeHackerDev', scrapeController.lifeHackerDev);
	// router.get('/feed/infoworld', scrapeController.infoworld);
	// router.get('/feed/mozillaHacks', scrapeController.mozillaHacks);
	// router.get('/feed/smashingMagazine', scrapeController.smashing);


	var router = express.Router();

	router.route('/feeds')
		.post(feedController.create)
		.get(feedController.list);
	router.route('/feeds/:id')
		.get(feedController.show)
		.put(feedController.update)
		.delete(feedController.delete);

	router.post('/scrape/verifyPath', scrapeController.verifyPath);
	router.get('/', homeController.home);
	router.get('/styleguide', homeController.styleguide);
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
