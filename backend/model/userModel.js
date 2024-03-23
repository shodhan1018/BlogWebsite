const mongoose=require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new mongoose.Schema({
    name:String,
    password:String,
    email:{
        type:String,
        unique:true
    },
    image:{
        type:String
    },
   
});

// module.exports=mongoose.model("User",userSchema);