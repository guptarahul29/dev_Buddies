
const express = require("express");

// require("./config/database.js")
const connectDB = require("./config/database.js")
const app = express();
const User =require("./models/user.js");

app.use(express.json());



app.post("/signup",async(req,res)=>{
    
    console.log(req.body);
    const user = new User(req.body);
    



//     const user =new User({
//         firstName:"Ram",
//         lastName:"gg",
//         age:20,
//         email:"ram@gmail.com"
//     }
// );
    try{
        await user.save();
        res.send("data store....");
    }
    catch{
        res.status(400).send("erorrrrrr")
    }

    

});
 



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



