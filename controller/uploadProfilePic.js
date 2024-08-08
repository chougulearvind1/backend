const User = require("../models/user");

const uploadProfilePic = async (req,res,next) => {
 
  const loggedUserId=req.user.id;
  const paramsId=req.params.id;
   console.log(loggedUserId,'logged userr id ',paramsId,'params id ');
  if(loggedUserId !==paramsId){
    return res.status(403).json({message:'you can only update your own profile picture'})

  }
  try {
    const user=await User.findById(paramsId,'-password');
    console.log("user" ,req);
    if(!user){
      return res.status(404).json({messsage:'user not found'})    
    }
    
      const body = await req.body;
     const buffer = Buffer.from(await body)
       const base64String= buffer.toString('base64')
       console.log(base64String,'base 64 string');
       const response = await fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: {
          'Authorization': `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
          'Content-Type': 'application/json',
          'User-Agent': 'PostmanRuntime/7.41.0'
        },
        body: JSON.stringify({
          image: base64String,
          type: 'base64'
        })
      });
      const result=await response.json();
      console.log(result,'result');
  res.send(`Imgur Client ID: ${process.env.IMGUR_CLIENT_ID} || 'not set'}`);
if (await result.success) {
        
        profle_picture1={...user.profle_picture} ||{}
        if(profle_picture1){
          profle_picture1.filename=result.data.link;
          user.profle_picture=profle_picture1;
        }
        
        console.log(user.profle_picture,'profile2');
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
     
     

    // res.status(200).json({message:'profile picture uploaded'})

  } catch (error) {
    console.log(error,"error profile pic");
    res.status(500).json({message:'server error',error:error.message})
  }



}


module.exports=uploadProfilePic;