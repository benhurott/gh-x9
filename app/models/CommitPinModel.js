var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function () {
    var schema = new Schema({
        sha: {
            type: String,
            required: true,
            maxlength: 100,
            index: true
        },
        commit: {
			type: Object,
			required: true
		},
        dateCreated: {
            type: Date,
            required: true,
            default: Date.now
        }
    });

    return mongoose.model('CommitPin', schema);
};
