import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    address: {
        type: String,
        default: "not specified",
    },
    gender: {
        type: String,
        default: "not specified",
    },
    dob: {
        type: Date,
        default: Date.now,
    },
    phone:{
        type: String,
        required: true,
    }
})


const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;
