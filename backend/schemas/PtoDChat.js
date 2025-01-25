import mongoose from "mongoose";

const patientToDoctorSchema = new mongoose.Schema({
  roomID: {
    type: String,
    required: true,
  },

  senderRole: {
    type: String,
    required: true,
  },

  message: {
    type: String,
    required: true,
  },

  timeStamp: {
    type: Date,
    default: Date.now,
    required: true,
  },

  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  },

  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  },
});

const PtoDChat =
  mongoose.models?.PtoDChat || mongoose.model("PtoDChat", patientToDoctorSchema);
export default PtoDChat;