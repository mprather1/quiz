var BaseModelView = Backbone.Marionette.View.extend({
  tagName: 'li',
  template: require("../templates/base-view-template.html"),
});

module.exports = BaseModelView;