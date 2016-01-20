var express  = require('express');

var app = express();
require('./routes')(app);
app.use(express.static(__dirname + '/public'));
app.listen(process.env.PORT || 8080);

exports = module.exports = app;
