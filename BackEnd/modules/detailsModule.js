const mongoose = require('mongoose');

const detailsSchema=mongoose.Schema({
    type:{type:String,required:true},
    source:{type:String,required:true},
    category:{type:String,required:true},
    description:{type:String,required:true},
    amount:{type:Number,required:true},
    date:{type:Date,default:Date.now},
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
        }
})
module.exports=mongoose.model('detail',detailsSchema);