var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require("mongoose-auto-increment");
var config = require("../_config");

var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

var environment = process.env.NODE_ENV || 'development';
var connectionString = config.mongoURI[environment];

var connection = mongoose.connect(connectionString, function(err, res){
  if (err){
    console.log("Error: " + err);
  } else if (process.env.NODE_ENV === 'development'){
      console.log("Connected to database: " + connectionString);
  }
});

autoIncrement.initialize(connection);

var questionSchema = new Schema({
  // _id: Number,
  content: String,
  answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }]
});

var answerSchema = new Schema({
  _question: { type: Number, ref: "Question" },
  content: String
});

questionSchema.plugin(autoIncrement.plugin, 'Question');

var question = mongoose.model('Question', questionSchema);
var answer = mongoose.model('Answer', answerSchema);

module.exports = {
  question: question,
  answer: answer
};