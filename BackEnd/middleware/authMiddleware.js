const jwt=require('jsonwebtoken');
const User=require('../modules/userDetails');

const protect=async(req,res,next)=>{
    const token=req.cookies.jwt;


    if(!token){
        return res.status(401).json({message:'Not authorized'})
    }
    try{
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        const user=await User.findById(decode.id).select('-password');
        if(!user){
          return  res.status(404).json({message:'user not found'});
        }
        req.user=user;
        next();
    }catch(err){
        res.status(401).json({message:'Not authorized , token failed'})
    }
}

module.exports=protect;