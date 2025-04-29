
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
});


// delete user by ID
app.delete("/users",async (req,res)=>{
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete({ _id : userId });

        // const user = await User.findByIdAndDelete(userId);
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
    catch(err){
        // res.send(user),
        res.status(400).send("something went wrong" +err.message)
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



