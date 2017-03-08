var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = function (app) {
	var uri = process.env.MONGO_URI;

	var logger = app.services.LoggerService;

    mongoose.connect(uri);

    mongoose.connection.on('connected', function () {
        logger.info('Mongoose! Connected in ' + uri);
    });

    mongoose.connection.on('disconnected', function () {
        logger.info('Mongoose! Desconnected from ' + uri);
    });

    mongoose.connection.on('error', function (error) {
        logger.fatal('Mongoose! Connection error: ' + error);
    });

    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            logger.info('Mongoose! Desconected by application finished');
            process.exit(0);
        });
    });
};
