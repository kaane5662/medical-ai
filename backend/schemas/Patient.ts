import exp from "constants";
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
        required:true
    },
    hasInsurance:{
        type:String,
        required:true
    },
    username:{
        typr:String,
        required:true
    }
  });

  const Paitent = mongoose.models?.Paitent || mongoose.model("Paitent", paitentSchema)
  export default Paitent