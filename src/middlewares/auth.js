const jwt = require("jsonwebtoken");
const User = require("../models/user");


const userAuth = async(req,res,next) =>{
  
   try{
     // read the token from req cookie
    
     const {token} = req.cookies;
     if(!token){
        throw new Error("Token not Found ");
     }
     const decodedObj = await jwt.verify(token,"RAHUL@1234");

     const {_id} = decodedObj;
     const user = await User.findById(_id);

     if(!user){
       throw new Error("User not found : ")
     }

     req.user =user;
     next()

   }
   catch(err){
        res.status(400).send(" Something went Wrong : " +err.message)
   }
};

const adminAuth = (req,res,next)=>{
    const token ="abc";
    const isauthorized = token==="ac";

    if(!isauthorized)
    {
        res.send("unathorized admin ");
    }
    else
    {
        console.log("passing next");
        next();
    }
};

module.exports ={
    userAuth,
    adminAuth,
}