import mongoose from "mongoose";


const aiChatMessageSchema = new mongoose.Schema({
    role:{
        type:String,
        required:true
    },
    text:{
        type:String,
        required:true
    },
    patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Patient",
        required:true
    },
    
    cache:{
        type:String,
        required:false
    }
})




  const AIMessage = mongoose.models?.AIMessage || mongoose.model("AIMessage", aiChatMessageSchema)
  export {AIMessage}