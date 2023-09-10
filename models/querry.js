const mongoose=require("mongoose")

const Schema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    phoneno:{type:Number,required:true},
    querry:String,
})
const Querry=mongoose.model("querry",Schema)


module.exports=Querry