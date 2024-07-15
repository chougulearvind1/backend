const express = require('express');
const router=express.Router();
const id = require('../controller/id');
const authenticate = require('../middleware/protected');
const following = require('../controller/follow');
const unfollow = require('../controller/unfollow');
const update = require('../controller/user_edit');
const uploadProfilePic = require('../controller/uploadProfilePic');
const upload = require('../middleware/multer_middleware');
const bodyParser = require('body-parser');
const getAllUserTweet = require('../controller/getAllUserTweet');



try {
   function bufferToMultyer(req,res,next){
      console.log(req,'req buffer to multer');
   }

  
    router.get('/user/:id',authenticate,id);
    router.post('/user/:id/follow',authenticate,following);
    router.post('/user/:id/unfollow',authenticate,unfollow);
    router.put('/user/:id/',authenticate,update)
    router.post('/user/:id/uploadProfilePic',authenticate,bodyParser.raw({ type: ["image/jpeg", "image/png"], limit: '5mb' }),uploadProfilePic)
    router.post('/user/:id/tweets',authenticate,getAllUserTweet);


    


} catch (error) {
    console.error();
}

module.exports={user_routes:router}

