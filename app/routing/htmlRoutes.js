var path = require('path');

module.exports = function(app) {
  app.get('/', function(err, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

  app.get('/survey', function(err, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
  });

  app.post('/survey-submit', function(req, res) {
    var array =[];
    for(var i = 1; i <= 10; i++) { array.push(parseInt(req.body[i])); }
    console.log(array);
  });

  app.get('/images', function(req, res) {
    res.sendFile(path.join(__dirname, "../public/images.png"));
  });

};
