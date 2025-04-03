import {v2 as cloudinary} from 'cloudinary';
const connectCloudinary = async () => {
    try {
        await cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        })
    } catch (error) {
        console.error('Cloudinary connection failed:', error.message);
        process.exit(1);
    }
}

export default connectCloudinary;
