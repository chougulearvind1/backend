const Tweet_model = require("../models/tweet_model");

const dislike=async (req,res) => {
    
    
    try {
           const loggedInUserId=req.user.id;
           const tweetId=req.params.id;
           
        
          const tweet=await Tweet_model.findById(tweetId)
        
          if(!tweet){
           
            return res.status(404).json({message:"tweet not found",error:error.message})
          }
         
          if(!tweet.likes.includes(loggedInUserId)){
            return res.status(400).json({message:"you can not dislike tweet which is not liked by you "})

          }
          tweet.likes=tweet.likes.filter(id=>id.toString()!==loggedInUserId.toString())
          let LikeCount=tweet.likes.length;
          
          await tweet.save();
          res.status(200).json({message:'DisLiked',IsLike:false,LikeCount:LikeCount})
          
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
module.exports=dislike;