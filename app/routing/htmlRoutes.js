var path = require('path');
var friends = require('../data/friends.js');
var bodyParser = require('body-parser');

const reducer = (accumulator, currentValue) => accumulator + currentValue;

module.exports = function(app) {
  app.get('/', function(err, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

  app.get('/survey', function(err, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
  });

  app.post('/survey-submit', function(req, res) {
    //Creating an array of the player's score
    var array =[];
    for(var i = 1; i <= 10; i++) { array.push(parseInt(req.body[i])); }

    //Checks to see if the name already exists in the "database" ELSE sort logic
    var name = false; var currentScore = []; var matchScores = [];
    var allMatches = [];
    var match = "";
    for(var i = 0; i < friends.length; i++) {
      if(friends[i].name === req.body.name) {
        name = true;
        alert('Name already Exists! Please select a different Name!')
      } else {
        //Comparison Logic
        for(var j = 0; j < friends[i].score.length; j++) {
          currentScore.push( Math.abs(friends[i].score[j] - req.body[j]) );
        }

        /*pushing it to an array where the index of this array will match
        the index of the potential match (we have a reference point) */
        matchScores.push(currentScore.reduce(reducer));

      }

      //Appends the Name of the Match
      //allMatches.push(friends[indexOfFirst].name);
      var indexOfFirst = matchScores.indexOf(Math.min.apply(null, matchScores), i);
      match += friends[indexOfFirst].name + ", ";
    }

    //Storing it to the Database
    if(!name) {
      var object = {
        name: req.body.name,
        score: array
      }
      friends.push(object);
    }

    res.send('You have matched with ' + match);

  });

  app.get('/images', function(req, res) {
    res.sendFile(path.join(__dirname, "../public/images.png"));
  });

  app.get('/images2', function(req, res) {
    res.sendFile(path.join(__dirname, "../public/images2.png"));
  });

};
