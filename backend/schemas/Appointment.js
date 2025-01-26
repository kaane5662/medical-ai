import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({

    appointmentID: {
        type:String,
        required: true,
    },

    patientName: {
        type:String,
        required:true,
    },

    appointmentTime: {
        type:Date,
        required:true,
    },

    reason: {
        type:String,
        required:true,
    }
});

const Appointment = mongoose.models?.Log || mongoose.model("Appointment", appointmentSchema)
export default Appointment