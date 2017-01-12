var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();
var Question = require('../db/db').question;
var Answer = require('../db/db').answer;

chai.use(chaiHttp);

describe('Questions', function(){
  
  before(function(done){
    Question.collection.drop();
    done()
  })
  
  beforeEach(function(done){
    var newQuestion = new Question({
      _id: 0,
    });
    newQuestion.save(function(err){
      done();
    });
  });
  
  afterEach(function(done){
    Question.collection.drop();
    done();
  });
  
  it("should create question and populate with answers", function(done) {
    var question = new Question({
      _id: 2
    });
    var answer1 = new Answer({
      _question: question,
      content: "answer number 1"
    });
    var answer2 = new Answer({
      _question: question,
      content: "answer number 2"
    });
    
    answer1.save(function(err, answer){
      if(err){ console.log(err) }
    });
    answer2.save(function(err, answer){
      if(err){ console.log(err) }
    });
    
    question.answers.push(answer1, answer2);
    
    question.save(function(err, data){
      chai.request(server)
      .get('/api/questions/' + data.id)
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.answers.should.be.a('array');
        res.body.answers[1]._question.should.equal(2);
        done();
      });
    });
  });
  
  it('GET should list All questions at /api/questions', function(done){
    chai.request(server)
    .get('/api/questions')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body[0].should.have.property('_id');
      done();
    });
  });
  
  it('GET should list a SINGLE question at /api/question/:id ', function(done) {
    var newQuestion = new Question({
      _id: 1,
    });
    newQuestion.save(function(err, data){
      chai.request(server)
      .get('/api/questions/' + data.id)
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.a.property('_id');
        res.body._id.should.equal(1);
        done();
      });
    });
  });
  
  it("POST should add a single question", function(done) {
    chai.request(server)
    .post('/api/questions')
    .send({"name": "giant douche"})
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property("success");
      res.body.success.should.be.a('object');
      done();
    });
  });
  
  it.skip('PUT should update a single question at /api/questions/:id', function(done) {
    chai.request(server)
    .get('/api/questions')
    .end(function(err, res){
      chai.request(server)
      .put('/api/questions/' + res.body[0]._id)
      .send({"name": "turd sandwich"})
      .end(function(error, response){
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.should.have.property('updated');
        response.body.updated.should.be.a('object');
        done();
      });
    });
  });
  
  it('DELETE should delete a single question at /api/questions/:id', function(done) {
    chai.request(server)
    .get("/api/questions")
    .end(function(err, res){
      chai.request(server)
      .delete("/api/questions/" + res.body[0]._id)
      .end(function(error, response){
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.should.have.property('removed');
        response.body.removed.should.be.a('object');
        done();
      });
    });
  });
});