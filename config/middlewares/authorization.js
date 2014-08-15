
/*
 *  Generic require login routing middleware
 */

exports.requiresLogin = function (req, res, next) {
  if (req.isAuthenticated()) return next();
  if (req.method == 'GET') {
      req.session.returnTo = req.originalUrl;
  }
  res.redirect('/');
}

/*
 *  User authorization routing middleware
 */

exports.user = {
  hasAuthorization: function (req, res, next) {
    if (req.profile.id != req.user.id) {
        console.log('not auth')
      return res.redirect('/' + req.profile.id)
    }
    next();
  }
}

/*
 *  Article authorization routing middleware
 */
//
// exports.article = {
//   hasAuthorization: function (req, res, next) {
//     if (req.article.user.id != req.user.id) {
//       req.flash('info', 'You are not authorized')
//       return res.redirect('/articles/' + req.article.id)
//     }
//     next()
//   }
// }
