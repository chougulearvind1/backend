const tweets = require("../models/tweet_model");
const pl = require('tau-prolog')
const loader = require("tau-prolog/modules/lists.js");
loader(pl);
// Initialize Tau-Prolog session
const session = pl.create();
// Function to add MongoDB tweet to Prolog fact
const addTweetToProlog = (tweet) => {
    const tweetId = tweet.id.toString(); // Convert MongoDB ObjectId to string
    const content = tweet.content;
    const likes = tweet.likes.length
    const retweetBy = tweet.retweetBy.length
    const image = tweet.image || ''; // Image URL (optional)
    const replies = tweet.replies.map(reply => reply.toString())|| ''; // Convert replies to string if they're ObjectIds  
    // Prolog fact format
    const prologFact = `tweet("${tweetId}", "${content}","${tweet.tweetedBy.UserName}","${tweet.tweetedBy.profle_picture.filename}",${likes}, ${retweetBy}, "${image.replace(/\\/g, "/")}", ["${replies.join(', ')}"]).`;
    return prologFact;
   
  };

const all_tweets =async (req,res) => {
    try {
       
   
            const Tweet=await tweets.find()
                .populate('tweetedBy','-password')              
                .populate('likes','-password')
                .populate('retweetBy','-password')                
                .sort({ createdAt: -1 })
  
           
if (!Tweet) {
    return res.status(404).json({message :'tweet not found'})
}else{
    let prologFacts = `:- dynamic(tweet/8).\n`;
    Tweet.forEach(tweet => {
        prologFacts += addTweetToProlog(tweet)
    });
    prologFacts +=`\n member(X, [X|_]):- !.
    member(X, [_|Tail]) :- member(X, Tail).
    not(Goal) :- call(Goal), !, fail.
     not(_).
    is_reply(TweetId) :-tweet(_, _, _, _, _, _, _, Replies),member(TweetId, Replies).
    is_original_tweet(TweetId) :- not(is_reply(TweetId)) .
    original_tweet(TweetId, Content, UserName, Profile, Likes, RetweetBy, Image, Replies) :- tweet(TweetId, Content, UserName, Profile, Likes, RetweetBy, Image, Replies), is_original_tweet(TweetId).`
    
    // Add the Prolog fact to the session
    console.log(prologFacts,'prologfacts');
    session.consult(prologFacts, {
        success: () => {
            console.log("Fact added successfully!")
            session.query(`original_tweet(TweetId, Content, UserName, Profile, Likes, RetweetBy, Image, Replies).`,{
                success: () => {
                    session.answers((answer) => {
                        if (answer) {
                            // Parse the answer and print each variable
                            console.log("Answer:", session.format_answer(answer));
                        } else {
                            console.log("No more results.");
                        }
                    });
                },
                error: (err) => console.error("Query error:", err),
            });
        },
        error: (err) => console.error("Error adding fact:", err)
    });

}

return res.status(201).json({message:Tweet})
} catch (error) {
    console.log(error);
res.status(500).json({message:'server error ',error:error.message})
}
}
module.exports=all_tweets;
