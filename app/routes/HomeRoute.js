var moment = require('moment')

module.exports = function(app) {
    app.get('/', function(req, res, next) {
        res.redirect('/projects');;
    });

	app.get('/server-info', function(req, res, next) {
		res.status(200).json({
			now_utc: moment.utc().format(),
			now_w_timezone: moment().format()
		});
	})
}
