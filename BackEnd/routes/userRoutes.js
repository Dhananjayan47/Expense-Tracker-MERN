const express=require('express');
const {registerUser,loginUser,logoutUser,verifyOtp,getProfile}=require('../controllers/userController');
const protect=require('../middleware/authMiddleware');
const router=express.Router();

router.post('/SignUp',registerUser);
router.post('/Login',loginUser);
router.post('/VerifyOtp',verifyOtp);
router.get('/Profile',protect,getProfile);
router.post('/Logout',protect,logoutUser);


module.exports=router;