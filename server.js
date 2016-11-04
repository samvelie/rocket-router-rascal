var express = require("express");
var app = express();
var getPalette = require("./lib/getPalette");

app.get("/", function (req, res) {
  res.sendStatus(200);
});

app.listen(8000);
