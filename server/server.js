var express = require('express');
var bodyParser = require('body-parser');
var {mongoose} = require('../DB/mongoose');
var {Todo} = require('../Model/Todo');
var {User} = require('../Model/users');
var {ObjectID} = require('mongodb')
//var {queryDB}=require('../playground/mongoose-query')
var app = express();
const port=process.env.PORT||3000;
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
//get by id route.
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});
app.listen(3000, () => {
  console.log(`server start at port ${port}`);
});

module.exports={app};
