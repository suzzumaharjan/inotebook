const mongoose=require('mongoose');
const {Schema}=mongoose;
//generate schemas
const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        defailt:Date.now
    }
});
//restrict from entering same value in database
const User=mongoose.model("user",UserSchema);
User.createIndexes();
module.exports=User;