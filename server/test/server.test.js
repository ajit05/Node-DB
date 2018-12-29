const expect=require('expect');

const request=require('supertest');

const {app}=require('../server');

const{Todo}=require('../../Model/Todo');

const mocha=require('mocha');

//-----------------For claering  the DB----------------------
//if you are expecting collection length to be Zero(0).
beforeEach((done)=>
{
        Todo.remove({}).then(()=> done(),
        (err)=>console.log(err));
});



describe('POST/todos',()=>
{
    it('should create a new todo',(done)=>
    {
        var text='ok you start the game';


        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res)=>
        {
            expect(res.body.text).toBe(text)
            
        })
        .end((err,res)=>
        {
            if(err)
                return  done(err);

                Todo.find().then((result)=>
                {
                   // expect(result.length).toBe(1);
                    expect(result[0].text).toBe(text);
                    done();

                }).catch((e)=>done(e));
        });
    });

    it('it should crate todo whith  invalid status code',(done)=>
    {  //var text='xxxxxx';
        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err,res)=>
        {
            if(err)
            return done(err);
            Todo.find().then((todo)=> 
            {
                expect(todo.length).toBe(1);
                done(); 
            }).catch((e)=>done(e));
            
        });
    });
});
