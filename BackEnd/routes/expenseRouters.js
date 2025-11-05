const express=require('express');
const rateLimit=require('express-rate-limit');
const{getTotal,addNewExpense,getTodayList,gre,getThisWeekList,getThisMonthList,updateItem,deleteItem}=require('../controllers/expenseController')
const router=express.Router();
const protect=require('../middleware/authMiddleware')

const formSubmissionLimiter=rateLimit({
    windowMs:1000,
    max:5,
    message:{
        error:"Too many submissions. Please wait a second"
    }
})


router.post('/total/:getType',getTotal)
router.post('/gre',gre)
router.get('/todayLists',protect,getTodayList);
router.get('/thisWeekLists',protect,getThisWeekList);
router.get('/thisMonthLists',protect,getThisMonthList);
router.post('/submitItem',formSubmissionLimiter,protect,addNewExpense)
router.post('/updateItem',protect,updateItem)
router.post('/deleteItem',protect,deleteItem)

module.exports=router;