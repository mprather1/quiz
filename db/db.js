var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
  _id: Number,
  answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }]
});

var answerSchema = new Schema({
  _question: { type: Number, ref: "Question" },
  content: String
});

var question = mongoose.model('Question', questionSchema);
var answer = mongoose.model('Answer', answerSchema);

module.exports = {
  question: question,
  answer: answer
};