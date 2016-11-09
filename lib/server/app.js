var express = require("express");
var app = express();
var index = require('./routes/index');
var hello = require('./routes/welcome');
var getPalette = require("./modules/getPalette");
var bodyParser = require('body-parser');
var spaceshipParts = require('./modules/spaceship-parts');
var port = 8000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', index);
app.get('/hello', hello);
app.get('/parts', function(req, res){
  res.send(spaceshipParts);
});
app.post('/newPart', function(req, res){
  spaceshipParts.push(req.body);
  res.sendStatus(200);
});
app.get('/rocketCount', function(req, res){
  var numberOfSpaceships = Math.floor(spaceshipParts[0].inStock/spaceshipParts[0].needed);
  for(var i = 1; i < spaceshipParts.length; i++){
    numberOfSpaceships = Math.min(numberOfSpaceships, Math.floor(spaceshipParts[i].inStock/spaceshipParts[i].needed));
    console.log(spaceshipParts[i].inStock, spaceshipParts[i].needed, numberOfSpaceships);
  }
  var howMany = { count: numberOfSpaceships }
  res.send(howMany);
});

app.use(express.static('lib/public'));

app.listen(port);
console.log("Listening on port: ", port);
