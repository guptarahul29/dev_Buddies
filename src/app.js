const express = require("express");
const { userAuth,adminAuth } = require("./middlewares/auth");

const app = express();

// const {userAuth} = require("./middlewares/auth.js")

//Handle Auth midddleware for all GET , POST .... Requests
app.use("/user",userAuth);

app.use("/admin",adminAuth,(req,res)=>{
    res.send("adimn data");
})

// after passing from /user next() it comes belove code
app.get("/user/alldata",(req,res)=>{
    res.send("you get all data");
});

app.get("/user/delete",(req,res)=>{
    res.send("Delete your data");
})


app.listen(7777,()=>{
    console.log("Succesfully port to 7777");
    
});
