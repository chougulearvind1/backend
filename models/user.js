const mongoose = require('mongoose');

const UserSchema= new mongoose.Schema({
  Name:{
    type:String,
    required:true

  },
  UserName:{
    type:String,
    required:true,
    unique:true
  },
  Email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true,

  },
  profle_picture:{
    type:JSON ,

  },
  location:{
    type:String
  },
  date_of_birth:{
    type:Date,

  },
  followers:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  }],
  following:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  }]

},{timestamps:true});

// const TweetSchema = new mongoose.Schema({
//   tweetedBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   comments: {
//     type: String,
//     required: true
//   },
//   likes: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   }],
//   retweetBy: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   }],
//   image: {
//     type: String,
//     default: null
//   },
//   replies: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Tweet'
//   }]
// }, { timestamps: true }); // Adding timestamp feature for createdAt and updatedAt

// Define Tweet model
//const Tweet = mongoose.model('Tweet', TweetSchema);
const User = mongoose.model('User', UserSchema);

module.exports = User;