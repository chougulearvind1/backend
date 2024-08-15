const  User  = require("../models/user");
const bcrypt = require('bcrypt');

const register = async(req,res) => {  
  try {
    
    const {Name,Email,UserName,password,location,date_of_birth}=await req.body;
    if(!Name||!Email||!UserName||!password){
        return res.status(400).json({message:'All feild are mandatrory',sucess:false,error:req.body});

    }
      // Regular expression to validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(Email)) {
    return res.status(400).json({ message: 'Invalid email address' });
  }
  // Regular expression to validate full name with at least two words
const fullNameRegex = /^[a-zA-Z]+ [a-zA-Z]+(?: [a-zA-Z]+)*$/;
  if (!fullNameRegex.test(Name)) {
    return res.status(400).json({ message: 'full name with at least two words',success:false,errors:'Name' });
  }
let check_unique=await User.findOne({Email}) ;
  if(check_unique){
    return res.status(403).json({message:'Email already registerd',success:false,errors:'Email'})
  }
  check_unique=await User.findOne({UserName})
  if (check_unique) {
    return res.status(403).json({message:'User name already used',success:false,errors:'UserName'})
  }
  let dob='';
  if(req.body.date_of_birth){dob=new Date(date_of_birth)}
    // if  Profile_image not getting from user then add defaultimage profile to user
    if(!req.file){
      req.file={
        fieldname: 'profle_picture',
        originalname: 'image.png',
        encoding: '7bit',
        mimetype: 'image/png',
        destination: './profile_img/',
        filename: 'default.jpg',
        path: 'profile_img\\default.jpg',
        size: 620021
      }
    }
     
  
  const hash_password = await bcrypt.hash(password,7)
  const new_user=new User({location,date_of_birth:dob,Name,UserName,Email,password:hash_password,profle_picture:req.file});
console.log(new_user)
  const resp=new_user.save();
  if (resp) {   
    res.status(201).json({message:"user registerd Sucessfully",success:true})
  } 
  } catch (error) {
    console.log(error)
  }
}
module.exports=register;