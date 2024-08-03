const User = require('../models/user');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();
const jsonwebtoken = require('jsonwebtoken');

const login=async (req,res) => { 
    try {
      console.log("you entered into login function adn req  body is ",req.body);
        let {UserName,password,Email}=req.body;
       
       if (!UserName||!password) {
        
        return res.status(400).json({message:"email and password required ",error:'UserName',success:false});
       }
        
        let user=await User.findOne({$or:[{Email},{UserName}]});//user login with Email or UserName
      
        if (!user) {
          return  res.status(400).json({message:"Email not registerd with us yet",error:'UserName',success:false})
        }
        const match =await bcrypt.compare(password,user.password);
        const payload={
          _id:user._id,
          Name:user.Name,
          Email:user.Email
        }
        if (match) {        
         const token=await jsonwebtoken.sign(payload,process.env.JWT_SECRET_KEY) 
         res.cookie('token',token,{httpOnly:true})               
           return res.status(200).json({message:"Logged in sucessfully.",token,success:true,UserName:user.UserName,Name:user.Name,id:user.id,LoggedUser:user})
                   
         
        } else {
          return res.status(400).json({message:" password incorrect ",error:'password',success:false})
  
        }
    } catch (error) {
      console.log(error);
    }
   }
  module.exports=login;