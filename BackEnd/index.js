const express=require('express');
const cookieParser=require('cookie-parser')
const dotenv=require("dotenv");
const cors=require('cors');
// const bodyParser=require('body-parser');

const connectDB=require('./config/db');
const userRoutes=require('./routes/userRoutes');
const expenseRoutes=require('./routes/expenseRouters');



dotenv.config();

connectDB()
const app=express();
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/user',userRoutes);
app.use('/api/expense',expenseRoutes);





app.listen(process.env.PORT,()=>console.log(`server runs in ${process.env.PORT}`));