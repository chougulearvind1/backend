const mongoose = require('mongoose');
const User = require('./user');
const mongooseHistory = require('mongoose-history');

const TweetSchema=new mongoose.Schema({
    content:{
        type:String,
        requird:true

    },
    tweetedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:User
    }],
    retweetBy:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:User
    }],
    image:{
        type:String,
    },
    replies:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'tweets'
    }]
},{timestamps:true});

TweetSchema.plugin( mongooseHistory)
const tweets= mongoose.model('tweets',TweetSchema);

module.exports=tweets;