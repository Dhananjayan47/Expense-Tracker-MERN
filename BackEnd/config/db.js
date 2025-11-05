const mongoose=require('mongoose');

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('mongoDB connected')
    }catch(err){
        console.error('db connection error :',err);
        process.exit(1);
    }
};

module.exports=connectDB;