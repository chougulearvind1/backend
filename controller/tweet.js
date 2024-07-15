
const Tweet = require("../models/tweet_model");

const tweet=async (req,res) => {

  const {content}=req.body;
  const tweetedBy=req.user.id
  if(!content){
    return res.status(400).json({message:'content is required'})
  }
  const tweet_data={content, tweetedBy}
 
  if(req.file){
    tweet_data.image=req.file.path;
  }
    try {
        const tweet_post= new Tweet(tweet_data);
     
        const tweet_save=await tweet_post.save()
        
       if (req.originalUrl==='/API/tweet/' ){
        
        return res.status(200).json({message:'tweeted',Tweet:tweet_save})
       }
       
       return tweet_save;
    } catch (error) {
        res.status(500).json({error:error.message,message:'failed to create tweet'})
    }
  
}



module.exports=tweet;