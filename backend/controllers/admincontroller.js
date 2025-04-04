//api for adding doctor
import validator from "validator";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import {v2 as cloudinary} from "cloudinary";
import doctorModel from "../models/doctorModel.js";
const addDoctor = async (req, res) => {
    try {
        const {name, email, password, specialization, degree, experience, about, fees, address } = req.body;
        const image = req.file;
        
        // Validate required fields
        if(!name || !email || !password || !specialization || !degree || !experience || !about || !fees || !address){
            return res.status(400).json({message: "All fields are required"});
        }
        
        if(!image){
            return res.status(400).json({message: "Image is required"});
        }
        
        if(!validator.isEmail(email)){
            return res.status(400).json({message: "Invalid email"});
        }
        
        if(password.length < 8){
            return res.status(400).json({message: "Password is not strong"});
        }
        
        // Check if doctor with this email already exists
        const existingDoctor = await doctorModel.findOne({ email });
        if (existingDoctor) {
            return res.status(400).json({message: "Doctor with this email already exists"});
        }
        
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // Upload image to Cloudinary
        let imageurl = null;
        try {
            const imageupload = await cloudinary.uploader.upload(image.path, {
                folder: "dispensary/doctors",
                resource_type: "image"
            });
            imageurl = imageupload.secure_url;
        } catch (uploadError) {
            console.error("Cloudinary upload error:", uploadError);
            return res.status(500).json({ message: "Image upload failed", error: uploadError.message });
        }
        
        // Create and save doctor
        try {
            let parsedAddress;
            try {
                parsedAddress = typeof address === 'string' ? JSON.parse(address) : address;
            } catch (err) {
                return res.status(400).json({message: "Invalid address format"});
            }
            
            const doctorData = {
                name,
                email,
                image: imageurl,
                password: hashedPassword,
                specialization,     
                degree,
                experience,
                about,
                fees,
                address: parsedAddress,
                date: Date.now(),
            };
            
            const newDoctor = new doctorModel(doctorData);
            await newDoctor.save();
            
            res.status(201).json({
                message: "Doctor added successfully", 
                doctor: {
                    id: newDoctor._id,
                    name: newDoctor.name,
                    email: newDoctor.email,
                    specialization: newDoctor.specialization
                }
            });
        } catch (saveError) {
            console.error("Doctor save error:", saveError);
            return res.status(500).json({ message: "Error saving doctor", error: saveError.message });
        }
    } catch (error) {
        console.error("Add doctor error:", error);
        res.status(500).json({message: "Internal server error", error: error.message});
    }
}

//admin login
const adminLogin = async (req, res) => {
    try {
        const {email, password}=req.body;
        if(!email || !password){
            return res.status(400).json({message: "All fields are required"});
        }
        if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD){ 
            return res.status(400).json({message: "Invalid email or password"});
        }
        const token = jwt.sign(email+password, process.env.JWT_SECRET);
        res.status(200).json({message: "Admin login successful", token: token});
        
    } catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message});
    }
}

export {addDoctor, adminLogin};

