var BaseModelView = require("./BaseModelView");

var BaseCollectionView = Backbone.Marionette.CollectionView.extend({
  tagName: 'ul',
  childView: BaseModelView
});

module.exports = BaseCollectionView;