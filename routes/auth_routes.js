const express = require('express');
const register =require('../controller/register')
const login=require('../controller/login')
const upload=require('../middleware/multer_middleware.js');
const authenticate = require('../middleware/protected');
const router=express.Router();
try {
  console.log(login,'login  ')
    router.post('/auth/register',upload.single('profle_picture'),register);
    router.post('/auth/login',login)
    router.get('/auth/profile',authenticate,(req ,res) => {
      res.send(req.user)
    })
   
    
    
} catch (error) {
    console.log(error);
}




module.exports={auth_routes:router};