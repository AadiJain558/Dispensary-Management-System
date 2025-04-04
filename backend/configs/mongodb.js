import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log('Connected to MongoDB');
        });

        // Use direct connection string without appending database name in the URL
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'dispensary', // Set database name explicitly as an option
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
       
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
}

export default connectDB;
