const Detail=require('../modules/detailsModule')

const addNewExpense=async(req,res)=>{
    try{
            const {type,source,category,description,amount}=req.body;
            const newDetail=new Detail({type,source,category,description,amount,user:req.user._id});
            const saveDetail= await newDetail.save();
            res.status(200).json({success:true,save:saveDetail});
        }catch(error){
            console.log('error saving msg',error);
            res.status(500).json({error:"server.error"})
        }
};
const updateItem=async(req,res)=>{
    try{
        const userId=req.user._id
        const {type,source,category,description,amount}=req.body;
        const updatedItem= await Detail.findByIdAndUpdate(
            {_id:req.body._id,user:userId},{type,source,category,description,amount},{new:true}
        )
        if(!updatedItem){
            return res.status(404).json({
                message:`data not found$}`,
                info:req.body,
            })
        }
        res.status(200).json({message:'Edited Item saved successfully',info:updatedItem})
    }catch(err){
        res.status(500).json({message:'server error' ,error:err})
    }
}
const deleteItem=async(req,res)=>{
    try{
        const userId=req.user._id;
        const itemId=req.body._id;
        if (!itemId || !userId) {
            return res.status(400).json({ message: 'Missing item ID or user ID' });
        }

        const result = await Detail.deleteOne({ user: userId, _id: itemId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Item not found or already deleted' });
        }

        res.status(200).json({message:'item deleted successfully'})

    }catch(err){
        console.error('delete error:',err)
        res.status(500).json({message:'error when delete item',error:err})
    }
}

const getTotal=async(req,res)=>{
    try {
        const {getType}=req.params;
        const items=req.body;
        
        if (!Array.isArray(items)) {
            return res.status(400).json({ error: 'Expected an array of items.' });
        }
        const type = getType.toUpperCase();  // normalize the type to uppercase
        if (type !== 'INCOME' && type !== 'EXPENSE') {
            return res.status(400).json({ error: 'Invalid type. Must be INCOME or EXPENSE' });
        }
        const total = items.reduce((sum, item) => {
            if (item.type?.toUpperCase() === type) {
                const amount = parseFloat(item.amount);
                return sum + (isNaN(amount) ? 0 : amount);
            }
            return sum;
        }, 0);

        res.json(total);

    } catch (error) {
        res.status(500).json('error vanthuchi',error)
    }
}
const gre=async(req,res)=>{
    try {
      
        const items=req.body;
        
        if (!Array.isArray(items)) {
            return res.status(400).json({ error: 'Expected an array of items.' });
        }
        const total = items.reduce((sum, item) => {
            if (item.type?.toUpperCase() === 'INCOME') {
                const amount = parseFloat(item.amount);
                return sum + (isNaN(amount) ? 0 : amount);
            }
            return sum;
        }, 0);

        res.json(total);

    } catch (error) {
        res.status(500).json('error vanthuchi',error)
    }
}
const getTodayList=async(req,res)=>{
    try{
        const userId=req.user._id;
        const now = new Date();

        const start = new Date(Date.UTC(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate(),
            0, 0, 0
        ));
        
        const end = new Date(Date.UTC(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate(),
            23, 59, 59, 999
        ));
        const items=await Detail.find({
            date:{$gte:start,$lte:end},
            user:userId
        })
        res.json(items);
    }catch(err){
        res.status(500).json({error:"something went wrong"})
    }
}

const getThisWeekList=async(req,res)=>{
    try{
        const userId=req.user._id;
        
        const now=new Date();
        const currentUTCDay=now.getUTCDay();

        const firstDayOfWeek = new Date(Date.UTC(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate() - currentUTCDay,
            0, 0, 0,
        ));
        const lastDayOfWeek = new Date(Date.UTC(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate() - currentUTCDay + 6,
            23, 59, 59, 999
        ));

        const items=await Detail.find({
            user:userId,
            date:{$gte:firstDayOfWeek,$lte:lastDayOfWeek},
        })
        res.json(items);
    }catch(err){
        res.status(500).json({error:"something went wrong"})
    }
}
const getThisMonthList=async(req,res)=>{
    try{
        const userId=req.user._id;
        
        const now=new Date();

        const firstDayOfMonth = new Date(Date.UTC(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            1, 
            0, 0, 0
        ));

        const lastDayOfMonth = new Date(Date.UTC(
            now.getUTCFullYear(),
            now.getUTCMonth() + 1,
            0,
            23, 59, 59, 999
        ));

        const items=await Detail.find({
            user:userId,
            date:{$gte:firstDayOfMonth,$lte:lastDayOfMonth},
        })
        res.json(items);
    }catch(err){
        res.status(500).json({error:"something went wrong"})
    }
}

module.exports={addNewExpense,getTodayList,getThisWeekList,getThisMonthList,getTotal,updateItem,deleteItem,gre};