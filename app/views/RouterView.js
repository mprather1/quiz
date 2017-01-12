var RouterView = Backbone.Marionette.View.extend({
  tagName: 'div',
  template: require("../templates/router-view-template.html"),
  initialize: function(options){
    this.message = options.message;
    console.log(this.message);    
  },
  serializeData: function(){
    return {
      "message": this.message
    };
  }
});

module.exports = RouterView;