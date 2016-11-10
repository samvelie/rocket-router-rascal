var express = require('express');
var router = express.Router();
var path = require('path');

app.get('/', function(req, res){
  res.sendFile(path.resolve('./lib/public/index.html'));
});

module.exports = app;
