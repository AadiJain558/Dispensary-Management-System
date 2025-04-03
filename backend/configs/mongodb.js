import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        mongoose.connection.on('connected',()=>{
            console.log('Connected to MongoDB');
        })
        await mongoose.connect(`${process.env.MONGO_URI}/dispensary`);
       
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
}

export default connectDB;
