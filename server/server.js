var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('../DB/mongoose');
var {Todo} = require('../Model/Todo');
var {User} = require('../Model/users');

var app = express();

app.use(bodyParser.json());
//post route 
app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});
//get route

app.get('/todos',(req,res)=>
{
  Todo.find().then((result)=>
  {
    res.send({result});
  },(err)=>
  {
    return err;
  });
});
app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports={app};
// install expect mocha nodemon supertext  for  testing purpose dev depences 
//When you're writing tests, you often need 
//to check that values meet certain conditions.
// expect gives you access to a number of "matchers" that let you validate different things.
//For additional Jest matchers maintained by the Jest Community check out jest-extended.
/*Mocha is a feature-rich JavaScript test framework running 
on Node.js and in the browser, making asynchronous testing 
simple and fun. Mocha tests run serially,
 allowing for flexible and accurate reporting,
 while mapping uncaught exceptions to the correct test cases. Hosted on GitHub.*/
//9531