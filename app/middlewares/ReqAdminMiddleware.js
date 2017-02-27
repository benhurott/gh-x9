var md5 = require('md5');

var publicRoutes = [
	'/login'
];

module.exports = function(app) {
	app.use(function(req, res, next) {
		if(publicRoutes.indexOf(req.url) >= 0) {
			return next();
		}

		var auth = req.cookies.ghx9;

		if(!!auth && auth === md5(process.env.ADMIN_KEY)) {
			next();
		}
		else {
			if(req.xhr) {
				res.status(401).end();
			}
			else {
				res.redirect('/login');
			}
		}
	});
};
