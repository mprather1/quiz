global.jQuery = require('jquery');
require('bootstrap');

var App = require("./App");

var app = new App();
app.start();

module.exports = app;
