const express = require('express');
const router=express.Router();
const authenticate = require('../middleware/protected');
const upload = require('../middleware/multer_middleware');
const tweet = require('../controller/tweet');
const like = require('../controller/like');
const dislike = require('../controller/dislike');
const reply = require('../controller/reply');
const tweet_details = require('../controller/tweet_details');
const all_tweets = require('../controller/allTweet');
const deleteTweet = require('../controller/deleteTweet');
const retweet = require('../controller/retweet');



try {
   router.post('/tweet',authenticate,upload.single('image'),tweet )
   router.post('/tweet/:id/like',authenticate,like)
   router.post('/tweet/:id/dislike',authenticate,dislike)
   router.post('/tweet/:id/reply',authenticate,reply)
   router.get('/tweet/:id',authenticate,tweet_details)
   router.get('/tweet',all_tweets )
   router.delete('/tweet/:id',authenticate,deleteTweet)
   router.post('/tweet/:id/retweet',authenticate,retweet)
   


} catch (error) {
    console.error(error);
}

module.exports={tweet_routes:router}

