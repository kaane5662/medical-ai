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
    patients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
      },
    ],
    doctorId: {
        required: true,
        type:String
    },
    hospitalName: {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    }
  });

  const Doctor = mongoose.models?.Doctor || mongoose.model("Doctor", doctorSchema)
  export default Doctor