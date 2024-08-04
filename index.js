const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const morgan= require('morgan')
dotenv.config();
const app=express();
const {auth_routes}=require('./routes/auth_routes')
const {user_routes} = require('./routes/user_routes');
const {tweet_routes} = require('./routes/tweet_routes');

app.use('/profile_img',express.static(path.join('profile_img')))
app.use('/tweets',express.static(path.join('tweets')))
app.use(morgan('dev'));
app.use(cors())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json({ limit: "50mb" }))
// app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
const port = process.env.PORT || 4000;
console.log('server  ',port ,process.env.MONGO_URL);

mongoose.connect(process.env.MONGO_URL,{
        family: 4
})
.then(()=>console.log('connected'))
.catch((error) => {console.log("error while connecting",error)});

app.use('/API',auth_routes);
app.use('/API',user_routes);
app.use('/API',tweet_routes)




app.listen(port,() => {

    console.log('server is listening on port ',port)
})
