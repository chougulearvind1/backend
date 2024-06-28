
const User = require('../models/user');


const update= async (req,res,next) => {
  const loggedInUserId=req.user.id;
  const userId=req.params.id;

  if(loggedInUserId !==userId){
    return res.status(403).json({message:'you can only update your own profile'});

  }
  const {Name ,date_of_birth,location}=req.body;
  
  const errors=validateData(req.body)
  
  if(Object.keys(errors).length>0){
    return res.status(400).json({message:'Validation errors',error:errors})
  }
  try {
    const user=await User.findById(userId);
    
    if (!user) {
        return res.status(404).json({message:'user not found'})
         }       
          user.Name=Name;      
          user.date_of_birth=date_of_birth;      
          user.location=location;
        await user.save();
        next()
        return res.status(200).json({message:'user updated successfully',user})

  } catch (error) {
    res.status(500).json({ message: 'Server error 1', error: error.message });
  }

}


const validateData =(data) => {
  const {Name,date_of_birth,location}=data;
  let errors={}
  if(Name&&(typeof Name!=='string'||Name.trim===''))
  {
    const fullNameRegex = /^[a-zA-Z]+ [a-zA-Z]+(?: [a-zA-Z]+)*$/;
  if (!fullNameRegex.test(Name)) {
   errors.Name='At least two word need to complete the full Name';
   }
   errors.Name='Name is required and must be a valid string ';

  }
  if(date_of_birth&&(isNaN(Date.parse(date_of_birth))))
    {
        errors.date_of_birth='date of birth is required and must be a valid string'
    }

  if(location&&(typeof location!=='string'||location.trim()===''))
  {errors.location='Location is required and must be a valid string'}  
  return errors;
}
module.exports=update;
