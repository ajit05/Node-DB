const expect=require('expect');

const request=require('supertest');

const {app}=require('../server');

const{Todo}=require('../../Model/Todo');

const mocha=require('mocha');

const {ObjectID} =require('mongodb');

const todos = [{
  _id: new ObjectID(),
    text: 'First test todo'
  }, {
    _id: new ObjectID(),
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
          //expect(res.body.todos.length).toBe(3);
         console.log(JSON.stringify(res.body,undefined,2));
        })
        .end(done);
    });
  });

  describe('GET/todos/:id',()=> {
    it('should  get todos by passed id',(done)=>
    {console.log(todos[0]._id.toHexString());
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res)=>
        { expect(res.body.todo.text).toBe(todos[0].text)
          console.log(JSON.stringify(res.body,undefined,2));
        })
        .end(done);

    });
    it('should get 404 for this test case',(done)=>
    {
      var hexId=new ObjectID().toHexString();
        request(app)
        .get(`/todos/${hexId}`)
        .expect(404)
        .end(done);
    });
    it('should return 404 for non-object',(done)=>
    {
      request(app)
      .get('/todos/123r')
      .expect(404)
      .end(done);
    });

  });
  


