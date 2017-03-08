require('dotenv').config()

var http = require('http');
var app = require('./app/express')();

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server escutando a porta ' + app.get('port'));
});
