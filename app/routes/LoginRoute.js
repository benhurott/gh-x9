var md5 = require('md5');

module.exports = function(app) {

	app.get('/login', function(req, res, next) {
		res.render('login');
	});

	app.post('/login', function(req, res, next) {
		var code = req.body.code;

		if(code === process.env.ADMIN_KEY) {
			res.cookie('ghx9', md5(process.env.ADMIN_KEY));
			res.status(200).end();
		}
		else {
			res.status(401).json({
				message: 'Are you realy a user? I can see your moves...'
			});
		}
	});

	app.post('/signout', function(req, res, next) {
		res.clearCookie('ghx9');

		res.status(200).end();
	});
};
