const tweets = require("../models/tweet_model");

const deleteTweet = async(req,res) => {
 
try {
    
      const tweetId=req.params.id;
      const userId=req.user.id;

      if(!tweetId.tweetedBy===userId){
        return res.status(404).json({message:'you can not delete other user tweet'})
        }
      const tweet=await tweets.findById(tweetId)
      if (!tweet) {
       return res.status(404).json({message:'tweet not found to delete tweet'})
      }
    //  await tweets.deleteMany({_id:{$in:tweet.replies}})
      const del=await tweets.findByIdAndDelete(tweetId)
      return res.status(200).json({message:'Tweet Deleted sucessfully',deleted_user:del})
            
    } catch (error) {
      res.status(500).json({message:'server error ',error:error.message})
    }
    
    }
module.exports=deleteTweet;
