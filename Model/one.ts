
const mongoose=require('mongoose');
var Todo=mongoose.model('Todo',{
    text:
    {
        type:String,
        require:true,
        minlength:2,
        trim:true

    },
    complted:
    {
        type:Boolean,
        default:false
    },
    comapltedAt:
    {
        type:Number,
        default:null
    }
});
module.exports={Todo};