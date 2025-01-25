
import mongoose from "mongoose";

const paitentSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
        type:String,
        required:true
    },
    logs: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Log"
    }],
    doctors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
      },
    ],
    


    insuranceNumber: {
        type:String,
        required: false
    },
    insurancePlan: {
        type:String,
        required:false
    },
    insuranceProvider: {
        type:String,
        required:false
    },
    tosAccepted:{
        type:Boolean,
        required:false
    },
    email:{
        type:String,
        required:true,
        unique: true, // Ensures no duplicate emails
        match: [/.+@.+\..+/, "Please enter a valid email address"], // Email validation
    },
    hasInsurance:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique: true, // Ensures no duplicate emails
    },
    password:{
        type: String,
        required:true,
        minlength: 8, // Minimum length of 8 characters
        maxlength: 128,
    }
    
  });

  const Patient = mongoose.models?.Patient || mongoose.model("Patient", paitentSchema)
  export default Patient