import { log } from "console";
import mongoose from "mongoose";

const doctorLogSchema = new mongoose.Schema({
    diagnosis: [{
        type:String,
        required:true
    }],
    symptoms: [{
        type:String,
        required:true
    }],
    description:{
        type:String,
        required:true
    },
    timestamp:{
        type:Date,
        default: Date.now(),
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true,
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true,
    },
  });

  const Log = mongoose.models?.DoctorLog || mongoose.model("DoctorLog", doctorLogSchema)
  export default Log