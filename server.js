var express = require('express');
var path = require('path');
var parser = require('body-parser');

var app = express();

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

require('./app/routing/apiRoutes.js')(app);
require('./app/routing/htmlRoutes.js')(app);

app.listen(8080, function() {
  console.log("App listening on port 8080 . . .");
});
