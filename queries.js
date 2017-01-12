var Question = require("./db/db").question;

function getAllQuestions(req, res){
  Question.find(function(err, question){
    if (err){ res.send(err); }
    res.json(question);
  });
}

// function getSingleQuestion(req, res){
//   Question.findById(req.params.id, function(err, question){
//     if (err){ res.send(err); }
//     res.status(200)
//     .json(question);
//   });
// }

function getSingleQuestion(req, res){
  Question.findById(req.params.id)
  .populate("answers")
  .exec(function(err, question){
    res.status(200)
      .json(question)
  })
}

function createQuestion(req, res){
  var question = new Question();
  question.name = req.body.name;
  question.save(function(err){
    res.status(200)
      .json({ success: question, message: "Created one question...", })
  })
}

function updateQuestion(req, res){
  Question.findById(req.params.id, function(err, question){
    if (err){ res.send(err) }
    question.name = req.body.name;
    question.save(function(err){
      if (err){ res.send(err); }
      res.json({ updated: question, message: "Question updated..."});
    });
  });
  
}

function removeQuestion(req, res){
  Question.remove({
    _id: req.params.id
  }, function(err, question){
    if (err){
      res.send(err)
    }
    res.json({ removed: question, message: 'Question deleted...'})
  })
}

module.exports = {
  getAllQuestions: getAllQuestions,
  getSingleQuestion: getSingleQuestion,
  createQuestion: createQuestion,
  updateQuestion: updateQuestion,
  removeQuestion: removeQuestion
};