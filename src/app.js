const express = require("express");

const apppps = express();

// apppps.use("/add",(req,res)=>{
//     res.send("start")
// })


// apppps.use("/ab",(req,res)=>{
//     res.send("hello from server.......");

// });

// apppps.use("/abcd",(req,res)=>{
//     res.send("hello hello, hello")
// })


apppps.use("/user",
    (req,res,next)=>{
    res.send("1st send message ....");
    next();
},(req,res,next)=>{
    next();
    // res.send("2nd send message ....");

},(req,res,next)=>{
    next();
    // res.send("3rd send message")
})


apppps.listen(7777,()=>{
    console.log("Succesfully port to 7777");
    
});
