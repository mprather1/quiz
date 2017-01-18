var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var expect = chai.expect;
var Question = require('../db/db').question;
var Answer = require('../db/db').answer;

chai.use(chaiHttp);

describe('Questions', function(){
  
  before(function(done){
    Question.collection.drop();
    Answer.collection.drop();
    done()
  })
  
  beforeEach(function(done){
    Question.resetCount(function(err, nextCount){
      if(err){ console.log(err) }
    });
    
    var question = new Question({
      content: 'test question'
    });

    var answer1 = new Answer({
      _question: question._id,
      content: "answer number 1"
    });
    var answer2 = new Answer({
      _question: question._id,
      content: "answer number 2"
    });
    var answer3 = new Answer({
      _question: question._id,
      content: "answer number 3"
    });
    var answer4 = new Answer({
      _question: question._id,
      content: "answer number 4"
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
    
    question.save(function(err){
      done();
    });
  });
  
  afterEach(function(done){
    Question.collection.drop();
    Answer.collection.drop();
    done();
  });
  
  it('POST should create question and answers', function(done) {
    chai.request(server)
    .post('/api/questions')
    .send({"content": "test question", "answer1": "answer1", "answer2": "answer2", "answer3": "answer3", "answer4": "answer4"})
    .end(function(err, res){
      expect(res).to.have.status(200);
      expect(res.body.success._id).to.equal(1)
      expect(res.body.success).to.have.property('answers')
      expect(res.body.success.answers.length).to.equal(4)
      done();
    })
  })
  
  it('GET should list All questions at /api/questions', function(done){
    chai.request(server)
    .get('/api/questions')
    .end(function(err, res){
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.a('array');
      expect(res.body[0]).to.have.property('_id');
      expect(res.body[0]._id).to.equal(0)
      expect(res.body[0]).to.have.property('answers');
      expect(res.body[0].answers).to.be.a('array');
      expect(res.body[0].answers.length).to.equal(4)
      done();
    });
  });
  
  it('GET should list a SINGLE question at /api/question/:id ', function(done) {
    chai.request(server)
    .get('/api/questions')
    .end(function(err, res){
      chai.request(server)
      .get('/api/questions/' + res.body[0]._id)
      .end(function(err, res){
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('_id');
        expect(res.body._id).to.equal(0)
        expect(res.body).to.have.property('answers')
        expect(res.body.answers).to.be.a('array');
        expect(res.body.answers.length).to.equal(4);
        done();
      });
    })
  });
  
  it.skip('PUT should update a single question at /api/questions/:id', function(done) {
    chai.request(server)
    .get('/api/questions')
    .end(function(err, res){
      chai.request(server)
      .put('/api/questions/' + res.body[0]._id)
      .send({"name": "turd sandwich"})
      .end(function(error, response){
        expect(response).to.have.status(200);
        expect(response).to.be.json;
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('updated');
        expect(response.body.updated).to.be.a('object');
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
        expect(response).to.have.status(200);
        expect(response).to.be.json;
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('removed');
        expect(response.body.removed).to.be.a('object');
        done();
      });
    });
  });
});