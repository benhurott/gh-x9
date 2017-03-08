var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function () {
	var schema = new Schema({
		name: {
			type: String,
			required: true
		},
		repositories: [String]
	});

	return mongoose.model('Project', schema);
};
