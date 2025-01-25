import express from "express";
import http from "http";
import { Server } from "socket.io";
import PtoDChat from "../schemas/PtoDChat.js"; // Adjust the path to your schema

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins (update this in production)
  },
});

// WebSocket connection handling
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Join a room based on user ID
  const room = `room_${socket.user_id}`; // Ensure `socket.user_id` is set
  socket.join(room);

  // Fetch chat history for the room
  PtoDChat.find({ roomID: room })
    .sort({ timeStamp: 1 })
    .populate("patient doctor")
    .then((messages) => {
      socket.emit("chat_history", messages); // Emit chat history to the client
    });

  // Handle incoming messages
  socket.on("send_message", async (data) => {
    const { 
        message, 
        senderRole, 
        patientId,
        doctorId } = data;

    // Save the message to the database
    const chatMessage = new PtoDChat({
      roomID: room,
      senderRole,
      message,
      patient: patientId,
      doctor: doctorId,
    });
    await chatMessage.save();

    // Broadcast the message to the room
    io.to(room).emit("receive_message", chatMessage);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});