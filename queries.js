var Question = require("./db/db").question;
var Answer = require("./db/db").answer;


function getAllQuestions(req, res){
  Question.find(function(err, question){
    if (err){ res.send(err); }
    res.json(question);
  });
}

function getSingleQuestion(req, res){
  Question.findById(req.params.id)
  .populate("answers")
  .exec(function(err, question){
    res.status(200)
      .json(question)
  })
}

function createQuestion(req, res){
  
  var question = new Question({
    content: req.body.content
  });
  
  var answer1 = new Answer({
    _question: question._id,
    content: req.body.answer1
  });  
  var answer2 = new Answer({
    _question: question._id,
    content: req.body.answer2
  });  
  var answer3 = new Answer({
    _question: question._id,
    content: req.body.answer3
  });  
  var answer4 = new Answer({
    _question: question._id,
    content: req.body.answer4
  }); 
  
  answer1.save(function(err){
    if(err){ console.log(err) }
  })
  answer2.save(function(err){
    if(err){ console.log(err) }
  })
  answer3.save(function(err){
    if(err){ console.log(err) }
  })
  answer4.save(function(err){
    if(err){ console.log(err) }
  })
  
  question.answers.push(answer1, answer2, answer3, answer4);
  
  question.save(function(err, data){  
    res.status(200)
      .json({ success: data, message: "Created one question...", })
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