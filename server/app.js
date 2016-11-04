var express = require("express");
var app = express();
var index = require('./routes/index');
var getPalette = require("./lib/getPalette");

app.get('/', index);
app.use(express.static('public'));

app.listen(8000);
