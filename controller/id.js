
const tweets = require('../models/tweet_model');
const User = require('../models/user');

const id=async (req,res,next) => {
  try {

    const userId=req.params.id;
    const user= await User.findById(userId,{password:0})
    .populate('following','-password')
    .populate('followers','-password')
     
    // const UserAllTweet=await tweets.aggregate([{$match:{tweetedBy:user._id}}])
    if(!user){
        return res.status(404).json({message:'User not found'})

    }
    
    res.status(200).json({user:user});
    next();
    
   
  } catch (error) {
    console.log(error,'error');
      res.status(500).json({message:'server error',error:error.message})
  }
}


module.exports=id;