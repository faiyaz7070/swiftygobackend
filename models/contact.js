const mongoose=require("mongoose")

const Schema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    phoneno:{type:Number,required:true},
    typeofshifting:String,
    from:String,
    to:String,
    floorfrom:String,
    floorto:String
})
const Contact=mongoose.model("contact",Schema)


module.exports=Contact