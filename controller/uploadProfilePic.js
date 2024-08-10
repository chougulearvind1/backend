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
    if(!user){
      return res.status(404).json({messsage:'user not found'})    
    }
    
      const body = await req.body;
     const buffer = Buffer.from(await body)
       const base64String= buffer.toString('base64')
       console.log('file name',user.profle_picture.filename)
       const response = await fetch(`https://api.github.com/repos/chougulearvind1/images/contents/img/${await user.profle_picture.filename}`, {
        headers: {
            'User-Agent': 'request',
            'Authorization': `token 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`
        }
    });
       
        if (response.ok) {
            const data = await response.json();
             console.log(data.sha,'data sha')
             const resp = await fetch(`https://api.github.com/repos/chougulearvind1/images/contents/img/${await user.profle_picture.filename}`, {
                method: 'PUT',
                headers: {
                  'user-agent': 'request',
                  'Authorization': `token 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`,
                  'Content-Type': 'application/json' 
              },
                body: JSON.stringify({
                  message: user.profle_picture.filename+Date.now(),
                  content: base64String,
                  type: 'base64',
                  branch:'main',
                  sha:data.sha
                            
                })
              });
                
              res.status(200).json({message:'profile picture uploaded'})
                  
        } else {
          const resp = await fetch(`https://api.github.com/repos/chougulearvind1/images/contents/img/${await user.profle_picture.filename}`, {
            method: 'PUT',
            headers: {
              'user-agent': 'request',
              'Authorization': `token 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`,
              'Content-Type': 'application/json' 
          },
            body: JSON.stringify({
              message: user.profle_picture.filename+Date.now(),
              content: base64String,
              type: 'base64',
              branch:'main'                      
            })
          });
          res.status(200).json({message:'profile picture uploaded'})
        }
       
  
// if (await result.success) {
        
//         profle_picture1={...user.profle_picture} ||{}
//         if(profle_picture1){
//           profle_picture1.filename=result.data.link;
//           user.profle_picture=profle_picture1;
//         }
        
//         console.log(user.profle_picture,'profile2');
//          const userResult= await  user.save();
//          console.log(userResult,'user result');
// }
      
    // const old_file=user.profle_picture.destination+user.profle_picture.filename;   
    //   console.log(old_file,'old file',req.body);   
    
    //     await fs.writeFile(old_file, req.body ,(error) => {
    //   if (error) {
    //     throw error;
    //   } 
    // }
    //  )
     
  
     


  } catch (error) {
    console.log(error,"error profile pic");
    res.status(500).json({message:'server error',error:error.message})
  }



}


module.exports=uploadProfilePic;