const jsonwebtoken = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const User = require('../models/user');

const authenticate = async (req,res,next) => {
  
  const auth_header=req.headers["authorization"];
  if(!auth_header){
    return res.status(401).json({message:'unauthorized1'})

  }

  const token=auth_header.replace('Bearer ', "")
  if (!token) {
    return res.status(401).json({message:'unauthorized2'})

  } 
  try {
    
    const decode = jsonwebtoken.verify(token,process.env.JWT_SECRET_KEY);
    
    const user =await User.findById({_id : decode._id},{password:0})//retrurn all details expect password
   
    if(!user){
        return res.status(401).json({message:"unAuthorized3"})

    }
    req.user=user;
    
    next()
  } catch (error) {
    console.log(error)
    return res.status(401).json({message:'UnAuthorized'})

  }

}
module.exports=authenticate;