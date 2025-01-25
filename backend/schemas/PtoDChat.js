import mongoose from "mongoose";

const patientToDoctorSchema = new mongoose.Schema({
    roomID:{
        type:String,
        required:true,
    },

    senderRole:{
        type:String,
        required:true,
    },

    message:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },

    timeStamp:{
        type:
            Date, default: Date.now,
            required:true
    },

    patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Patient"
    },

    
    timestamp: { type: Date, default: Date.now }, 
})

const PtoDChat = mongoose.models?.PtoDChat || mongoose.model("PtoDChat", pTodChatSchema)
export default PtoDChat
