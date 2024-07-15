const tweets = require("../models/tweet_model");

const all_tweets =async (req,res) => {
    try {
        console.log('all tweet is called ')
   
            const Tweet=await tweets.find()
                .populate('tweetedBy','-password')
                .populate('replies','-password')                
                .populate('likes','-password')
                .populate('retweetBy','-password')
                .sort({ createdAt: -1 })
  
            
if (!Tweet) {
    return res.status(404).json({message :'tweet not found'})
} 
return res.status(201).json({message:Tweet})
} catch (error) {
    console.log(error);
res.status(500).json({message:'server error ',error:error.message})
}
}
module.exports=all_tweets;
