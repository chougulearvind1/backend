const tweets = require("../models/tweet_model");

 

const retweet = async (req,res) => {
  const tweetId=req.params.id;
 
  const tweet= await tweets.findById(tweetId);
  console.log(tweet,'twet');
  if(!tweet){
    return res.status(400).json({message:'tweet not found'})

  }

    if (tweet.retweetBy.includes(req.user.id) )
        {
            return res.status(403).json({message:'you already retweeted.'})
        }
        tweet.retweetBy.push(req.user.id); 
        
        await tweet.save()
       
        res.status(201).json({message:'retweet successful',tweet:tweet,ReTweetUser:req.user.UserName,count:tweet.retweetBy.length})
    
}

module.exports=retweet;
