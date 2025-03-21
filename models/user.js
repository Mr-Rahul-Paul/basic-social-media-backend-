const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/8"); 

let userSchema = mongoose.Schema({
    username : String , 
    email : String , 
    password : String , 
    age : Number , 
    password: String ,
    post:[
        { type : mongoose.Schema.Types.ObjectId,
        ref:'post'
        }
    ], 
    content: String, 
    likes:[{
        type: mongoose.Schema.Types.ObjectId , ref:"user"
    }]
}); 

module.exports = mongoose.model('user' , userSchema); 
