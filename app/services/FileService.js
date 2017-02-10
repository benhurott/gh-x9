var fs = require('fs');

module.exports = function (app) {

    return {
        readFile: function(filename, callback) {
            fs.readFile(filename, 'utf-8', function(err, content) {
                callback(err, content);
            });
        },

        readAllFiles: function (dirname, options) {
            var opt = Object.assign({
                onFileReaded: function(filename, content) {},
                onError: function(err) {},
                onEnd: function() {}
            }, options);

            fs.readdir(dirname, function (err, filenames) {
                if (err) {
                    opt.onError(err);
                    opt.onEnd();
                    return;
                }

                if(filenames.length === 0) {
                    opt.onEnd();
                    return;
                }

                filenames.forEach(function (filename, index) {
                    fs.readFile(dirname + filename, 'utf-8', function (err, content) {
                        if (err) {
                            opt.onError(err);
                            return;
                        }

                        opt.onFileReaded(filename, content);

                        var isLast = index === filenames.length - 1;
                        if(isLast) {
                            opt.onEnd();
                        }
                    });
                });
            });
        }
    }
}