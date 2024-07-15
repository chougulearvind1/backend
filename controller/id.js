
const User = require('../models/user');

const id=async (req,res,next) => {
  try {

    const userId=req.params.id;
    const user= await User.findById(userId,{password:0})
    .populate('following','Name','User')
    .populate('followers','Name','User');
    if(!user){
        return res.status(404).json({message:'User not found'})

    }
    next();
    res.status(200).json(user);
   
  } catch (error) {
    console.log(error,'error');
      res.status(500).json({message:'server error',error:error.message})
  }
}


module.exports=id;