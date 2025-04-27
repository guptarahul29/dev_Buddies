const express = require("express");

const app = express();

app.use("/",(err,req,res,next)=>{
    if(err){
        //log your error
        res.status(600).send("something is wrong")
    }
});

app.get("/user",(err,req,res)=>{
    //here we r rendomly throwing errors
    throw new Error("asdfghj")
})


// learn try catch 

app.use("/",(err,req,res,next)=>{
    if(err){
        //log your error
        res.status(600).send("something is wrong")
    }
});


app.listen(7777,()=>{
    console.log("Succesfully port to 7777");
    
});
