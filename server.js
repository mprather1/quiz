var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var config = require("./_config");
var routes = require("./routes");
var port = process.env.PORT || '8000';
var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

var environment = process.env.NODE_ENV || 'development';
var connectionString = config.mongoURI[environment];

mongoose.connect(connectionString, function(err, res){
  if (err){
    console.log("Error: " + err);
  } else if (process.env.NODE_ENV === 'development'){
      console.log("Connected to database: " + connectionString);
  }
});

if (process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'app/static')));

app.use('/api', routes);

var server = app.listen(port, function(){
  if (process.env.NODE_ENV === 'development'){
    console.log("Listening on port " + port + "...");
  }
});

module.exports = server;