
const Tweet = require("../models/tweet_model");

const tweet=async (req,res) => {

  const {content}=req.body;
  const tweetedBy=req.user.id
  if(!content){
    return res.status(400).json({message:'content is required'})
  }
  const tweet_data={content, tweetedBy}
 
  if(req.file){
    const resp = await fetch(`https://api.github.com/repos/chougulearvind1/images/contents/${await req.file.path}`, {
      method: 'PUT',
      headers: {
        'user-agent': 'request',
        'Authorization': `token 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`,
        'Content-Type': 'application/json' 
    },
      body: JSON.stringify({
        message: user.profle_picture.filename+Date.now(),
        content: base64String,
        type: 'base64',
        branch:'main'                      
      })
    });
    console.log(resp,'resp')
    tweet_data.image=req.file.path;
  }
    try {
        const tweet_post= new Tweet(tweet_data);
     
        const tweet_save=await tweet_post.save();
        let   ReturnTweet={...tweet_save.toObject()}
          ReturnTweet.tweetedBy=req.user
        
       if (req.originalUrl==='/API/tweet/' ){
        return res.status(200).json({message:'tweeted',Tweet:ReturnTweet})
       }       
       return tweet_save;
    } catch (error) {
        res.status(500).json({error:error.message,message:'failed to create tweet'})
    }
  
}



module.exports=tweet;