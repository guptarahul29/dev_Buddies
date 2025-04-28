const userAuth = (req,res,next)=>{
    const token ="abc";
    const isauthorized = token==="abc";

    if(!isauthorized)
    {
        res.send("unathorized user ");
    }
    else
    {
        console.log("passing next");
        next();
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