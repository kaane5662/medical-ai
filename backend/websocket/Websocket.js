import express from "express";
import http from "http";
import { Server } from "socket.io";
import { verifyToken } from "../jwtMiddleware.js"
import { socket } from "server/router";

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

    Cha
}
)