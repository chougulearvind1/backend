const tweets = require('../models/tweet_model');


const tweet_details =async (req,res) => {

    try {
                    const tweetId=req.params.id;
            console.log(tweetId,'tweetId')
            
            const tweet=await tweets.findById(tweetId)
                            .populate('tweetedBy','-password')
                            .populate({path:'replies',select:'-password'})
                            .populate('likes','-password')
                            .populate('retweetBy','-password')
              
                        
            if (!tweet) {
                return res.status(404).json({message :'tweet not found'})

            }
            
            return res.status(201).json({message:tweet})
    } catch (error) {
        res.status(500).json({message:'server error ',error:error.message});
    }
  

}
module.exports=tweet_details;
