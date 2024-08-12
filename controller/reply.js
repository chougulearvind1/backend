const Tweet_model = require("../models/tweet_model");
const tweet = require("./tweet");

const reply = async (req,res) => {
 try {
     req.body.tweetedBy=req.user.id;
      const reply_tweet=await tweet(req,res);
      const p_tweet=req.params.id;
      const parent_tweet= await Tweet_model.findById(p_tweet);
      if(!parent_tweet){
        return res.status(404).json({message:'Tweet not found'})
      }
      //console.log(reply_tweet,'reply tweet')
      parent_tweet.replies.push(reply_tweet)
      
      await parent_tweet.save();

      res.status(201).json({ message: 'Reply posted successfully',ReplyCount: parent_tweet.replies.length});
  
    } catch (error) {console.log(error)
        res.status(500).json({error:error.message})
    }
 

}
module.exports=reply;
