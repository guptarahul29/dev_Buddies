
const validator =require("validator");


const signUPDataValidation = (req)=>{
    const{firstName,lastName,email,age,skills,password}=req.body;

    if(!firstName || !lastName || !email || !age || !skills || !password )
    {
        throw new Error("Please fill all above datails")
    }
    else if(!validator.isEmail(email))
    {
        throw new Error("Enter valid Email")  
    }
    else if(!validator.isStrongPassword(password))
    {
        throw new Error("Enter Strong Password");
    }


};

module.exports = {
    signUPDataValidation,
}