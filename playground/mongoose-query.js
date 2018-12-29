const {mongoose}=require('../DB/mongoose');
const {Todo}=require('../Model/Todo');
const {ObjectId}=require('mongodb');

var id="5c275a987002570a18ce9168";
if(!ObjectId.isValid(id))
    return console.log('Given id is not valid id');


Todo.find({
    _id:id
}).then((result)=>
{
    console.log(JSON.stringify(result,undefined,2));
},(err)=>
{
    console.log('error in find query...',err);
});

Todo.findOne({
    
    text:'lets play game',
    complete:{$ne:false},
    completedAt:{$gt:10}

}).then((result)=>
{
    console.log(JSON.stringify(result,undefined,2));
},(err)=>
{
    console.log('Error in  findOne query..',err);
});



  Todo.findById(id).then((result)=>{

        console.log(JSON.stringify(result,undefined,2));
  
},(err)=>
{   console.log('error in findbyid method',err);
        return 'errror while quey';

});

