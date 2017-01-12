var express = require("express");
var router = express.Router();
var db = require("./queries");

router.route("/questions")
  .get(db.getAllQuestions)
  .post(db.createQuestion)

router.route("/questions/:id")
  .get(db.getSingleQuestion)
  .put(db.updateQuestion)
  .delete(db.removeQuestion)

module.exports = router;