const express=require("express");
const User = require("../models/User");
const router=express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser');

const JWT_secure="hellokittygirl";
// Route:1 cREATE A USER USING:POST "/api/auth/createuser", Desnot require auth
router.post('/createuser',[
    body('name','enter a valid name').isLength({min:4}),
    body('email','enter a valid email').isEmail(),
    body('password','password must be written 5').isLength({min:4})
],async(req,res)=>{
    //if there are errors return bad request and errors
    const errors=validationResult(req);
    let success=false;
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});
    }
    //check whether the user with same email exist or not
    try {
    let user= await User.findOne({email:req.body.email});
    if(user){
        //send the data in json formata nd end the request
        return res.status(400).json({success,error:"same email has been found"})
    }
    const salt=await bcrypt.genSalt(10);
    //bcrypt.hash gives us promise
    const securePassword=await bcrypt.hash(req.body.password,salt);
    //create a new user and store in mongodb
    user=await User.create({
        name:req.body.name,
        email:req.body.email,
        password:securePassword
    })
    const data={
        user:{
            id:user.id
        }
    }
    success=true;
    const authToken=jwt.sign(data,JWT_secure);
    // console.log(jwtData)
    res.json({success,authToken});
}
    catch (error) {
        console.error(error.message);
        //send the data and end the request
        res.status(500).send("Internal server error occur");
    }
    // .then(user=>res.json(user))
    // .catch(err=>{console.log(err)
    // res.json({
    //     error:'Please enter the valid valid email',
    // message:err.message})
    // })
    
    // obj={
    //     a:"1",
    //     name:"suja"
    // }
    // res.json(obj);

})

//Route 2: Authenticate the user using post:/api/auth/login
router.post('/login',[
    body('email','enter a valid email').isEmail(),
    body('password','password cannot be blank').exists()
],async(req,res)=>{
    let success=false;
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});
    }
    const{email,password}=req.body;
    try{
        let user=await User.findOne({email});
        if(!user){
        
            return res.status(400).json({success,error:"please login with a valid email credentials"})
        }
        const passwordCompare=await bcrypt.compare(password,user.password);
        if(!passwordCompare){
        return res.status(400).json({success,error:"please login with a valid credentials"})
        }
        const data={
            user:{
                id:user.id
            }
        }
        const authToken=jwt.sign(data,JWT_secure);
        success=true;
        // console.log(jwtData)
        res.json({success,authToken});
    }
    catch (error) {
        console.error(error.message);
        //send the data and end the request
        res.status(500).send("Internal server error occur");
    }
});
//Route:3 Get the Login user dteail using POST " /api/auth/getuser"
router.post('/getuser',fetchuser,async(req,res)=>{
try{
    //select the data leaving password
    userId=req.user.id;
    const user=await User.findById(userId).select("-password");
    res.json(user);
}
catch (error) {
    console.error(error.message);
    //send the data and end the request
    res.status(500).send("Internal server error occur");
}
});
module.exports=router;