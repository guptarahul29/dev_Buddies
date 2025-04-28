
const express = require("express");

// require("./config/database.js")
const connectDB = require("./config/database.js")
const app = express();
const User =require("./models/user.js");

app.use(express.json());

//find all Users
app.get("/users", async (req, res)=>{

    try{
        const users =await User.find({});
        res.send(users);
        console.log(users);
        
    }
    catch(err){
        res.status.send("Something went wrong")
    }

});

//get users by email id
app.get("/feed",async (req,res)=>{
    const emailId = req.body.email;
    try{
        // to find only one user which have same email then use ( User.findOne  )
        const users =await User.find({email : emailId});
        if(users.length===0){
            res.send("not found");
        }
        else{
            res.send(users);
            console.log(users);
        }
        
        
    }
    catch(err){
            res.send("Something wend wrong")
    }
})



// app.post("/signup",async(req,res)=>{
    
//     console.log(req.body);
//     const user = new User(req.body);
    
// //     const user =new User({
// //         firstName:"Ram",
// //         lastName:"gg",
// //         age:20,
// //         email:"ram@gmail.com"
// //     }
// // );
//     try{
//         await user.save();
//         res.send("data store....");
//     }
//     catch{
//         res.status(400).send("erorrrrrr")
//     }

    

// });
 



connectDB()
.then(()=>{
    console.log("DB connected.....");
    // here after connecting database succesfully , the we call app.listen........
    app.listen(7777,()=>{
        console.log("Succesfully port to 7777");
        
    });
})
.catch((err)=>{
    console.log("Db not connected")
})



