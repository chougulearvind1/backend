
const User = require('../models/user');

// http://localhost:5000/api/user/63a07827b36f743f88c20ee7/unfollow
//Endpoint POST/api/user/:id/unfollow
const unfollow=async (req ,res,next) => {
  try {
   
      const loggedInUserId=req.user.id;
    
    
    const userToUnfollowId =req.params.id;

    const loggedInUser= await User.findById(loggedInUserId);
    const userToUnfollow= await User.findById(userToUnfollowId);

    if(!loggedInUser||!userToUnfollow){
        return res.status(404).json({message:'user not found'})
    }
    //user cannot follow whom he is already following
    if(!loggedInUser.following.includes(userToUnfollowId)){
        return res.status(400).json({message:'Not follwing this user'})
    }
   
    loggedInUser.following=loggedInUser.following.filter(id=>id.toString()!== userToUnfollowId)
    userToUnfollow.followers=userToUnfollow.followers.filter(id=>id.toString()!== loggedInUserId);

    await loggedInUser.save();
    await userToUnfollow.save();

    next()
    res.status(200).json({message:'user unfollwed sucessfully'})
  } catch (error) {
     console.log(error,'error');
    res.status(500).json({message:'server error',error:error.message});

  }
}

module.exports=unfollow;