const mongoose=require("mongoose")

const Schema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
   
    message:String,

    
})
const Message=mongoose.model("message",Schema)


module.exports=Message