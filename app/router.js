var Marionette = require('marionette');
var Controller = require("./controller");

var Router = Marionette.AppRouter.extend({
  
  initialize: function(options){
    this.controller = new Controller({ app: options.app });
  },
  
  appRoutes: {
    'one': 'oneRoute',
    'two': 'twoRoute'
  }
  
});

module.exports = Router;