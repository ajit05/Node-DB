var mongoose=require('mongoose');

var user=mongoose.model('user',{
    email:
    {
        type:String,
        required:true,
        minlenght:6
    }
});

//var newUser=new user()

module.exports={user};