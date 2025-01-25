import PtoDChat from "../schemas/PtoDChat.js"; // Adjust the path to your schema

const newMessage = new PtoDChat({
  roomID: "room_patientId_doctorId",
  senderRole: "patient",
  message: "Hello, Doctor!",
  patient: "64f8e8f8e4b0f4a9f8e8f8f8", // Replace with actual patient ID
  doctor: "64f8e8f8e4b0f4a9f8e8f8f9", // Replace with actual doctor ID
});

await newMessage.save();
console.log("Message saved successfully:", newMessage);