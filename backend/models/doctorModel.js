import mongoose from 'mongoose';
const doctorSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },  
    password:{
        type:String,
        required:true,
    },
    specialization:{
        type:String,
        required:true,
    },
    experience:{
        type:Number,
        required:true,
    },
    degree:{
        type:String,
        required:true,
    },
    address:{
        type:Object,
        required:true,
    },
    phoneNumber:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    about:{
        type:String,
        required:true,
    },
    available:{
        type:Boolean,
        required:true,
    },
    fees:{
        type:Number,
        required:true,
    },
    date:{
        type:Array,
        required:true,
    },
    slots:{
        type:Object,
        required:true,
    }  
},{minimize:false })

const Doctormodel=mongoose.models.Doctor || mongoose.model('Doctor',doctorSchema);
export default Doctormodel; 
