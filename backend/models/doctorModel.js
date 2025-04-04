import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
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
        default:"",
    },
    image:{
        type:String,
        default:"https://via.placeholder.com/150",
    },
    about:{
        type:String,
        required:true,
    },
    available:{
        type:Boolean,
        default:true,
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
        default:{},
    }  
}, { 
    minimize: false,
    collection: 'doctors' // Explicitly define collection name
});

// Check if model exists first to avoid model overwrite issues
const Doctormodel = mongoose.models.Doctor || mongoose.model('Doctor', doctorSchema);
export default Doctormodel; 
