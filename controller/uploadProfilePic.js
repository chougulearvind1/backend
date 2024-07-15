const User = require("../models/user");
const fs = require('fs');
const upload=require('../middleware/multer_middleware')
const uploadProfilePic = async (req,res,next) => {
 
  const loggedUserId=req.user.id;
  const paramsId=req.params.id;
   console.log(loggedUserId,'logged userr id ',paramsId,'params id ');
  if(loggedUserId !==paramsId){
    return res.status(403).json({message:'you can only update your own profile picture'})

  }
  try {
    const user=await User.findById(paramsId);
    if(!user){
      return res.status(404).json({messsage:'user not found'})    }
       
    const old_file=user.profle_picture.destination+user.profle_picture.filename;   
      console.log(old_file,'old file',req.body);   
    
        await fs.writeFile(old_file, req.body ,(error) => {
      if (error) {
        throw error;
      } 
    }
     )


    res.status(200).json({message:'profile picture uploaded'})

  } catch (error) {
    console.log(error,"error profile pic");
    res.status(500).json({message:'server error',error:error.message})
  }



}


module.exports=uploadProfilePic;