import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/mongodb.js';
import connectCloudinary from './configs/cloudinary.js';
import adminrouter from './routes/adminroute.js';
import fs from 'fs';
import path from 'path';

//app configs
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

//middlewares
app.use(express.json());
app.use(cors());

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log('Uploads directory created');
}

//api routes
app.use("/api/admin", adminrouter);


app.get('/',(req,res)=>{
    res.send('API is running');
});


app.listen(port,()=> console.log(`Server is running on port ${port}`));








