import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
    symptoms: [{
        type:String,
        required:true
    }],
    glucose:{
        type:Number,
        required:true
    },
    bloodPressure:{
        type:Number,
        required:true
    },
    medications:[{
        type:String,
        required:true
    }],
    frequency:{
        type:String,
        required:true
    },
    
    timestamp:{
        type:Date,
        required:true
    },
    diagnosis: {
        type:String,
        required:false
    },
    description: {
        type:String,
        required: false
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        // required: true,
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        // required: true,
    },
  });

  const Log = mongoose.models?.Log || mongoose.model("Log", logSchema)
  export default Log