import express from "express";
import http from "http";
import { Server } from "socket.io";
import { verifyToken } from "../jwtMiddleware.js"
import { socket } from "server/router";
import PtoDChat from "../schemas/PtoDChat.js";

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins (update this in production)
  },
});


io.on("connection", (socket) =>{
    console.log("YiPPPE", socket.user)

    const room = `room_${socket.user_id}`
    socket.join(room)

    PtoDChat.find({roomID})
    .sort({timeStamp:1})
    .then((message) => {
        socket.emit("chat history", message);
    });

    socket.on("send_message", async (data) => {
        const { message } = data;
    
        // Save the message to the database
        const chatMessage = new ChatMessage({
          roomID,
          senderRole: socket.user.role, 
          message,
        });
        await chatMessage.save();
    
        // Broadcast the message to the room
        io.to(room).emit("receive_message", chatMessage);
      });

      socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.user);
      });

});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});