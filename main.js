var apiai = require('apiai');

var app = apiai("fa11e78b8c6e4657a4779658ff60f485");

var request = app.textRequest('My budget is 500$', {
    sessionId: '<unique session id>'
});

request.on('response', function(response) {
    console.log(response);
});

request.on('error', function(error) {
    console.log(error);
});

request.end();