var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var path = require('path');

module.exports = function () {
    var app = express();

    app.set('port', process.env.PORT);
    app.set('views', './app/views');

    app.use(express.static('./app/public'));

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json({ limit: '10mb' }));

    app.use(logger('dev'));
    app.use(cookieParser());

    load('core', { cwd: 'app' })
		.then('models/_setup.js').then('models')
        .then('services')
        .then('middlewares')
        .then('routes')
        .into(app);

	require('./plugins/database')(app);
	require('./plugins/template-engine')(app);

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handler
    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = process.env.DEV ? err : {};

        // render the error page
        res.status(err.status || 500);

		if(req.xhr) {
			res.json(res.locals.error);
		}
		else {
			res.render('error');
		}
    });

    return app;
};
