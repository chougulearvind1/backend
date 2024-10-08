const Tweet_model = require("../models/tweet_model");

const like=async (req,res) => {
    
    
    try {
           const loggedInUserId=req.user.id;
           const tweetId=req.params.id;
        
          const tweet=await Tweet_model.findById(tweetId)
          console.log(JSON.stringify(tweet))
          if(!tweet){
           
            return res.status(404).json({message:"tweet not found",error:error.message})
          }
         
          if(tweet.likes.includes(loggedInUserId)){
            return res.status(400).json({message:"tweet already liked ",IsLike:false})

          }
          
          tweet.likes.push(loggedInUserId)
          let LikeCount=tweet.likes.length;
          
          await tweet.save();
          res.status(200).json({message:"you Liked tweet",IsLike:true,LikeCount:LikeCount})
          
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
module.exports=like;