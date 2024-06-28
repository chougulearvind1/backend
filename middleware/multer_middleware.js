const multer = require('multer');
const path = require('path');

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
console.log(file,'multer middleware',JSON.stringify(req.body));
        if(req.originalUrl.startsWith('/API/auth/register'))
            {
                 cb(null,'./profile_img/')
            }
        if(req.originalUrl.startsWith('/API/tweet/')){
                
            cb(null,'./tweets/')
        }
    
    },
    filename:(req,file,cb) => {
        
       const unique_suffix= Date.now()+'-'+Math.random(Math.random()*1e9);
       const file_extension= file.originalname.split('.').pop();
      cb(null, file.fieldname +unique_suffix+'.'+file_extension)
    },
    
    
})
const fileFilter=(req,file,cb)=>{
    
    const filetype=/image\/jpeg|image\/jpg|image\/png/;
    
    const mimetype =  filetype.test(file.mimetype)
    if (mimetype ) {
        
        cb(null,true)
    } else {
        cb(new Error('file type not allowed .only JPG and GIF file are allowed '))
    } 

}

const upload=multer({
    storage:storage,
    limits:{filesize:3*1024*1024},
    fileFilter:fileFilter

})




module.exports=upload;