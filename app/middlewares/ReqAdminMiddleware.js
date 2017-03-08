var md5 = require('md5');

var publicRoutes = [
	'/login'
];

module.exports = function(app) {
	function hasValidCookie(req) {
		var authCookie = req.cookies && req.cookies.ghx9;
		var hasValidCookie = !!authCookie && authCookie === md5(process.env.ADMIN_KEY);

		return hasValidCookie;
	}

	function hasValidHeader(req) {
		var authHeader = req.headers['x-ghx9-auth'];
		var hasValidHeader = !!authHeader && authHeader === process.env.ADMIN_KEY;

		return hasValidHeader;
	}

	return function(req, res, next) {
		if(publicRoutes.indexOf(req.url) >= 0) {
			return next();
		}

		if(hasValidCookie(req) || hasValidHeader(req)) {
			req.isLogged = true;

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
	};
};
