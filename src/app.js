
const express = require("express");

// require("./config/database.js")
const connectDB = require("./config/database.js")
const app = express();
const User =require("./models/user.js");
const {signUPDataValidation} = require("./utils/validation.js");
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser");
const jwt =require("jsonwebtoken");
const {userAuth} = require("./middlewares/auth.js"); 

app.use(express.json());
app.use(cookieParser()); 
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
});

// delete user by ID
app.delete("/users",async (req,res)=>{
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete({ _id : userId });
        res.send("deleted succesfully")
    }
    catch(err){
        res.send("something wend wrong")
    }
});

//
app.patch("/users",async (req,res)=>{
    const userId =req.body.userId;
    const data =req.body;

    try{
        const allowUpdates=[
           "userId", "firstName","lastName","age","password","image","skills"
        ];
        const isupdateAllow= Object.keys(data).every((k)=>
        allowUpdates.includes(k)
        );
        if(!isupdateAllow){
            res.status(400).send("Update not allowed");
        }
        if(data?.skills.length > 4){
            throw new Error("not be more than 4");
        }

        const user = await User.findByIdAndUpdate({_id : userId}, data, {
            returnDocument : "after",
            runValidators: true,
        });
        // res.send("update succesfully")
        res.send(user)
    }
    catch(err){
        res.send("not mmmmore")

    }
})


app.post("/signup",async(req,res)=>{
    
   
    
//     const user =new User({
//         firstName:"Ram",
//         lastName:"gg",
//         age:20,
//         email:"ram@gmail.com"
//     }
// );
    try{
        //validation pf data 
        // function call from utils/validation
        signUPDataValidation(req);
// taking this datas only 
        const {firstName,lastName,password,email} = req.body

        // password encrypt 
        // package i from npm 
        const passwordHash = await bcrypt.hash(password,10);

        // creationg new instance of the User Model
        // console.log(req.body);
        // const user = new User(req.body); // this not as good so..
        const user= new User({
            firstName,
            lastName,
            password: passwordHash,
            email
        })


        

        await user.save();
        res.send("data store....");
    }
    catch(err){
        // res.send(user),
        res.status(400).send("something went wrong : " +err.message)
    }

    

});

app.get("/profile",userAuth,async (req,res)=>{
    
    try{
        const user = req.user  ;
       
        res.send(user);        
    }
    catch(err){
        res.send("something wend wrong : " +err.message)
    }
});

app.post("/sendConnectionRequest",userAuth,async(req,res)=>{
    const user =req.user;
        res.send(user.firstName + "  respond send");
})


app.post("/login",async(req,res)=>{
    try{
        const {email,password} = req.body;
         const user = await User.findOne({email:email})

        if(!user){
            throw new Error("User id is not present")
        }
          const ispasswordValid = bcrypt.compare(password, user.password);

        if(ispasswordValid){

            // create JWT token
           const token = await jwt.sign({ _id: user._id}, "RAHUL@1234",{ expiresIn :"1d" }) 
            console.log(token);

            res.cookie("token", token,{
                expires: new Date(Date.now()+8 * 3600000)
            });
            res.send("Login Succesfully")
            

        }
        else {
            throw new Error("Password not Match ");
        }
    }
    catch(err){
        res.status(400).send("Something Went Wrong " +err.message)
    }8
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



