require('dotenv').config({path: '../.env'});
var fs = require('fs');

var jsConfigs = {
    NUMBER_DISPLAY_COMMITS: Number(process.env.NUMBER_DISPLAY_COMMITS),
    COMMIT_SINCE_DAYS: Number(process.env.COMMIT_SINCE_DAYS),
    MINUTES_RELOAD_COMMITS: Number(process.env.MINUTES_RELOAD_COMMITS)
};

var fileContent = 'var config = ' + JSON.stringify(jsConfigs, null, 4);

fs.writeFile('../app/public/javascripts/config.js', fileContent, function(err) {
    if(err) {
        console.log(err);
    }
    else {
        console.log('generate-config-js :: DONE');
    }
});
