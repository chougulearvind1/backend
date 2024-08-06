const User = require("../models/user");
const fs = require('fs');
const upload=require('../middleware/multer_middleware');
const { type } = require("os");
const uploadProfilePic = async (req,res,next) => {
 
  const loggedUserId=req.user.id;
  const paramsId=req.params.id;
   console.log(loggedUserId,'logged userr id ',paramsId,'params id ');
  if(loggedUserId !==paramsId){
    return res.status(403).json({message:'you can only update your own profile picture'})

  }
  try {
    const user=await User.findById(paramsId,'-password');
    if(!user){
      return res.status(404).json({messsage:'user not found'})    
    }
       const base64String= req.body.toString('base64')
       const response = await fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: {
          'Authorization': `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image: base64String,
          type: 'base64'
        })
      });
      const result=await response.json()
if (result.success) {
        
        profle_picture1={...user.profle_picture} ||{}
        if(profle_picture1){
          profle_picture1.filename=result.data.link;
          user.profle_picture=profle_picture1;
        }
        
        console.log(user.profle_picture,'profile');
         const userResult= await  user.save();
         console.log(userResult,'user result');
}
      
    // const old_file=user.profle_picture.destination+user.profle_picture.filename;   
    //   console.log(old_file,'old file',req.body);   
    
    //     await fs.writeFile(old_file, req.body ,(error) => {
    //   if (error) {
    //     throw error;
    //   } 
    // }
    //  )
     
     

    res.status(200).json({message:'profile picture uploaded'})

  } catch (error) {
    console.log(error,"error profile pic");
    res.status(500).json({message:'server error',error:error.message})
  }



}


module.exports=uploadProfilePic;