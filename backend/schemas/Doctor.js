import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    specialty: {
      type: String,
      required: true,
    },
    malPracticeId: {
        type:String,
        required:false
    },
    patients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
      },
    ],
    licenceNumber: {
        required: true,
        type:String
    },
    hospitalName: {
        type:String,
        required:true
    },
    boardCertifications:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    phoneNumber:{
        type:String,
        required:true
    }
  });

  const Doctor = mongoose.models?.Doctor || mongoose.model("Doctor", doctorSchema)
  export default Doctor