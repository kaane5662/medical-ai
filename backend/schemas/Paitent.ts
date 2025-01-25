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

    insuranceId: {
        type:String,
        required: true
    },
    insurancePlan: {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
  });

  const Paitent = mongoose.models?.Paitent || mongoose.model("Paitent", paitentSchema)
  export default Paitent