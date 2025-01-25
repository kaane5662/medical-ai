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
        ref:"Patient"
    },
    aiChat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"AIChat"
    },
    cache:{
        type:String,
        required:false
    }
})

const chatSchema = new mongoose.Schema({
    
    patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Patient"
    },
    cache:{
        type:String,
        required:false
    },
    messages:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"AIMessage"
    }]
  });

  const AIChat = mongoose.models?.AIChat || mongoose.model("AIChat", chatSchema)
  const AIMessage = mongoose.models?.AIMessage || mongoose.model("AIMessage", aiChatMessageSchema)
  export {AIChat,AIMessage}