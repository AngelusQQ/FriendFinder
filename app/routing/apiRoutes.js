var path = require('path');
var friends = require('../data/friends.js');
var bodyParser = require('body-parser');

module.exports = function(app) {
  app.get('/api/friends', function(err, res) {
    res.json(friends);
  });
};
