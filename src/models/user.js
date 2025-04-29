const mongoose =require("mongoose");



const userSchema = new mongoose.Schema({
    firstName :{
        type : String,
        required : true,
    },
    lastName :{
        type : String,
    },
    email :{
        type : String,
        required: true,
        unique : true,
    },
    password : {
        type : String,
    },
    age :{
        type : Number,
    },
    gender : {
        type : String,
    },
    skills :{
        type : [],
    },
    image :{
        type:String,
        default :"abcd.png"
    }
    // creatAt :{
    //     type: Date
    // },
    // updateAt :{
    //     type :Date
    // }
    
},
    {
        timestamps:true
    }
);

module.exports = mongoose.model("User", userSchema);  