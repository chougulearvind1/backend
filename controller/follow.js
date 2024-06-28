
const user = require('../models/user');

const following=async (req,res,next) => {
  try {
    console.log(req.user,'params id')
  const loggedInUserId=req.user.id;// get id of Login user
  const  userToFollowId=req.params.id;// get id of user to follow
  const loggedInUser=await user.findById(loggedInUserId); //get login user data for follow and follwing
  const  userToFollow= await user.findById(userToFollowId);//get following  if for insert into logged user
  if(!loggedInUser||!userToFollow){
    return res.status(404).json({message:'User Not found'});       // if both data not get you cant insert to check it firstly 
  }
  //user not follwing or follower if it already follows 
  if(loggedInUser.following.includes(userToFollowId)){
    return res.status(400).json({message:'already following this user'})
  }
  //push both id  each other
  loggedInUser.following.push(userToFollowId);
  userToFollow.followers.push(loggedInUserId);

  //save id of each other in follwing and followers
  await loggedInUser.save();
  await userToFollow.save();
  next()
  res.status(200).json({message:'User followed sucessfully'})


    } catch (error) {
        res.status(500).json({message:'server error',error:error.message})
    }
}


 
module.exports=following;