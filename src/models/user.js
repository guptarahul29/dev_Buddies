const mongoose =require("mongoose");
const validator=require("validator");


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
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("in valid email type " +value); 
            }
        }
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
        // validate: {
        //     validator: function (value) {
        //       return value.length <= 4;
        //     },
        //     message: "You can specify up to 4 skills only"
        //   }
       
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