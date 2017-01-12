var BaseModel = require("../models").baseModel;

var BaseCollection = Backbone.Collection.extend({
  model: BaseModel,
  url: "http://shintech.ninja:8000/api/models"
});

module.exports = BaseCollection;