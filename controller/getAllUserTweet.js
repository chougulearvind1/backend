const tweets = require("../models/tweet_model");


async function getAllUserTweet(req,res) {

  try {
     const userId=req.params.id;
  let userTweet=await tweets.find({tweetedBy:userId})
   
  } catch (error) {
    console.log(error);
  }
 
}

module.exports=getAllUserTweet