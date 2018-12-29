const expect=require('expect');

const request=require('supertest');

const {app}=require('../server');

const{Todo}=require('../../Model/Todo');

const mocha=require('mocha');

//-----------------For claering  the DB----------------------
//if you are expecting collection length to be Zero(0).

const todos = [{
    text: 'First test todo'
  }, {
    text: 'Second test todo'
  }];
  
  beforeEach((done) => {
    Todo.remove({}).then(() => {
      return Todo.insertMany(todos);
    }).then(() => done());
  });

  describe('POST /todos', () => {
    it('should create a new todo', (done) => {
      var text = 'Test todo text';
  
      request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res) => {
          expect(res.body.text).toBe(text);
          console.log(JSON.stringify(res.body,undefined,2));
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          }
  
          Todo.find({text}).then((todos) => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          }).catch((e) => done(e));
        });
    });
  
    it('should not create todo with invalid body data', (done) => {
      request(app)
        .post('/todos')
        .send({})
        .expect(200)
        .expect((res)=>
        {
            console.log(JSON.stringify(res.body,undefined,2));
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          }
  
          Todo.find().then((todos) => {
            expect(todos.length).toBe(3);
            done();
          }).catch((e) => done(e));
        });
    });
  });
  

    
describe('GET /todos', () => {
    it('should get all todos', (done) => {
      request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
         // expect(res.body.todos.length).toBe(3);
         console.log(JSON.stringify(res.body,undefined,2));
        })
        .end(done);
    });
  });
  


