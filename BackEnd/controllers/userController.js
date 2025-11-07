const userDetails=require('../modules/userDetails.js');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const sendMail=require('../utils/mailer.js')

const registerUser=async (req,res)=>{
    
    try{
            const{name,email,password}=req.body
            const existUser=await userDetails.findOne({email})
            if(existUser){
                return res.status(400).json({error:"user already exist"})
            }
    
            const saltRound=11;
            const hashedPassword= await bcrypt.hash(password,saltRound);
    
            const newUser=new userDetails({name,email,password:hashedPassword});
            await newUser.save();

            await sendMail(email,"WELCOME TO EXPENSE TRACKER",`<h2>We are Welcomes ${name} to our <strong>Expense tracker page</strong></h2>`)
            res.status(201).json({message:'user registered successfully'})
        }catch(err){
            res.status(500).json({error:'server error',message:err.message})
        }
    };
    
    const loginUser= async(req,res)=>{
        try {
            
        const {email,password}=req.body;

        const existUser= await userDetails.findOne({email});
        if(!existUser){
            return res.status(404).json({message:'User not found'})
        }
    
        const isMatch=await bcrypt.compare(password,existUser.password)
        // const isMatch=(password===existUser.password)
        
        if(!isMatch){
            return res.status(400).json({message:'Password is incorrect'});
        }
        
        const otp = String(Math.floor(100000+Math.random()*900000));
        const hashedOtp= await bcrypt.hash(otp,10)
        existUser.verifyOtp=hashedOtp;
        existUser.verifyOtpExpireAt=Date.now()+ 5*60*1000;
        await existUser.save()
        
            sendMail(
                existUser.email,
                "Your OTP for verification",
                `<p>Your OTP is <strong>${otp} </strong> . This OTP is only valid  for 5 minutes</p>`
            ).then(() => {
                console.log(`OTP sent to ${existUser.email}: ${otp}`);
              }).catch(err => console.error("Failed to send OTP email:", err));;
            console.log(`otp sent to ${existUser.email}: ${otp}`)
        
        
        res.status(200).json({message:'otp sent to your email'})
    } catch (error) {
        console.error('Login Error', error)
        res.status(500).json({message:'server error'})
    }
}
const logoutUser=async(req,res)=>{
    try {
        res.clearCookie('jwt',{httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:'strict',})
            res.status(200).json({message:'Logged out successfully'})
    } catch (error) {
        return res.json({message:error.message})
    }
}

const verifyOtp=async (req,res)=>{
    try {
        
        const {otp,email}=req.body
        
        const user= await userDetails.findOne({email})
        if(!user || !user.verifyOtp){
            return res.status(400).json({message:'otp not found or already used and check user name'})
        }
        
        if(user.verifyOtpExpireAt<Date.now()){
            return res.status(400).json({message:'Otp is Expired'})
        }
        const isValid=await bcrypt.compare(otp,user.verifyOtp)
        if(!isValid){
            return res.status(400).json({message:'Otp is incorrect'})
            
        }  
        user.verifyOtp=''
        user.verifyOtpExpireAt=0
        user.isAccountVerified=true;
        await user.save();
        
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'});
        
        res.cookie('jwt',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV ==='production',
            sameSite:'None',
                    maxAge:24*60*60*1000,
                });
                res.status(200).json({message:'OTP verified . logged in.'})

    } catch (error) {
        res.status(500).json({error:'server error when otp check',message:error.message})   
    }
}
const getProfile=async(req,res)=>{
    const user=req.user;
    if(!user){
        return res.status(401).json({message:'Unauthorized'})
    }
    res.json(user);
    res.status(201).json({message:'sended your profile'})
};

module.exports={registerUser,loginUser,getProfile,verifyOtp,logoutUser}