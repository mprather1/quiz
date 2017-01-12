var Marionette = require('marionette');
var RootView = require("./views").rootView;
var Router = require("./router");

var App = Marionette.Application.extend({
  region: 'body',
  onStart: function(){
    this.view = new RootView();
    this.showView(this.view);
    this.Router = new Router({ app: this });
    Backbone.history.start();
  }
});

module.exports = App;