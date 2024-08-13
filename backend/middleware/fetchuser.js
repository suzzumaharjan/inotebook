const jwt = require('jsonwebtoken');
const JWT_secure="hellokittygirl";
const fetchuser=async(req,res,next)=>{
    //get user from jwt token and add id to req body
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error:"please authnticate with c=valid token"})
    }
    try{
        const data=jwt.verify(token,JWT_secure);
        req.user=data.user;
        next();
    }
    catch(error){
        res.send(401)
    }

}
module.exports=fetchuser;