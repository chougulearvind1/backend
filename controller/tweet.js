
const Tweet = require("../models/tweet_model");

const tweet=async (req,res) => {

  const {content}=req.body;
  const tweetedBy=req.user.id
  if(!content){
    return res.status(400).json({message:'content is required'})
  }
  const tweet_data={content, tweetedBy}
  if(req.file){
  const buffer=Buffer.from(await req.file.buffer) ;
  const base64String=buffer.toString('base64')
    console.log(req.file,'resp file')
    if(req.file){
      const resp = await fetch(`https://api.github.com/repos/chougulearvind1/images/contents/tweets/${await req.file.originalname}`, {
        method: 'PUT',
        headers: {
          'user-agent': 'request',
          'Authorization': `token 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`,
          'Content-Type': 'application/json' 
      },
        body: JSON.stringify({
          message: `Upload ${await req.file.originalname} ${Date.now()}`,
          content:base64String,
          type: 'base64',
          branch:'main'                      
        })
      });
    
      tweet_data.image=req.file.originalname;
  }
  
 
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
      console.log(error)
        res.status(500).json({error:error.message,message:'failed to create tweet'})
    }
  
}



module.exports=tweet;