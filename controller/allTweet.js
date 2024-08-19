const tweets = require("../models/tweet_model");

const all_tweets =async (req,res) => {
    try {
        const result= await tweets.aggregate([
            {    
              $unwind:{path:"$replies",preserveNullAndEmptyArrays:true}
            },
            {
              $group:{
                _id:null,
                allTweetIds:{$addToSet:"$_id"},
                replyTweetIds:{$addToSet:"$replies"}
              }
            },
            {
              $project:{
                allTweetIds:1,
                filterTweetIds:{
                  $setDifference:[
                    "$allTweetIds",{
                      $filter:{
                        input:"$replyTweetIds",
                        as:"replyId",
                        cond:{$ne:["$$replyId",null]}
                      }
                    }
                  ]
                }
              }
            }
           ])
           console.log('ids',result)
           const TweetIds=result[0]?.filterTweetIds || [];
   
            const Tweet=await tweets.find({_id:{$in:TweetIds}})
                .populate('tweetedBy','-password')
                .populate('replies')                
                .populate('likes','-password')
                .populate('retweetBy','-password')
                .sort({ createdAt: -1 }).lean()
  
            
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
