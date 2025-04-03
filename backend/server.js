import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/mongodb.js';
import connectCloudinary from './configs/cloudinary.js';

//app configs
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

//middlewares
app.use(express.json());
app.use(cors());


//api routes
app.get('/',(req,res)=>{
    res.send('API is running');
});


app.listen(port,()=> console.log(`Server is running on port ${port}`));








