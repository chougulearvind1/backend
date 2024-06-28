const { Console } = require("console");
const User = require("../models/user");
const fs = require('fs');

const uploadProfilePic = async (req,res,next) => {
  console.log(req.user,'req user')
 
  const loggedUserId=req.user.id;
  const paramsId=req.params.id;

  if(loggedUserId !==paramsId){
    return res.status(403).json({message:'you can only update your own profile picture'})

  }
  try {
    const user=await User.findById(paramsId);
    if(!user){
      return res.status(404).json({messsage:'user not found'})
    }
    const old_file=req.user.profle_picture.destination+req.user.profle_picture.filename;
    
    
    await fs.writeFile(old_file,req.body,(error) => {
      if (error) {
        throw error;
      }
    
      console.log('image  saved ')
    }
     )


    res.status(200).json({message:'profile picture uploaded'})

  } catch (error) {
    res.status(500).json({message:'server error',error:error.message})
  }



}


module.exports=uploadProfilePic;