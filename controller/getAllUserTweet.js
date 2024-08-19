const tweets = require("../models/tweet_model");
const id = require("./id");


async function getAllUserTweet(req,res,next) {

  try {
     const userId=req.params.id;
    
    
  let userTweet=await tweets.find({tweetedBy:userId}).populate('tweetedBy','-password').sort({ createdAt: -1 })
  
  res.status(201).json({UserTweets:userTweet})
  // const UserAllTweet=await tweets.aggregate([{$match:{tweetedBy:user._id}}])

   
  } catch (error) {
    console.log(error);
  }
 
}

module.exports=getAllUserTweet