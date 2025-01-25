import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { router as DoctorRouter } from "./routes/doctors.js";
import { router as PatientRouter } from "./routes/patients.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { Server } from "socket.io"; // Import socket.io
import jwt from "jsonwebtoken"; // Import JWT for token verification
import PtoDChat from "./schemas/PtoDChat.js"; // Adjust the path to your schema

dotenv.config();

const app = express();

// MongoDB connection
console.log(process.env.MONGO_URL);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected!"))
  .catch((error) => console.log(error.message));

// CORS configuration
const corsOptions = {
  origin: "http://localhost:3000", // Allow requests from this origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allowed HTTP methods
  credentials: true, // Enable cookies and authentication headers
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/doctors", DoctorRouter);
app.use("/patients", PatientRouter);

// Simple route to confirm the server is running
app.get("/", (req, res) => {
  res.send("Express.js with WebSocket!");
});

// Start the Express server
const PORT = 5000;
const expressServer = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Create a WebSocket server using the Express server
const io = new Server(expressServer, {
  cors: {
    origin: "http://localhost:3000", // Allow WebSocket connections from this origin
    methods: ["GET", "POST"], // Allowed WebSocket methods
    credentials: true, // Enable credentials (cookies, authentication headers)
  },
});

// WebSocket middleware for authentication
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error("Authentication error: No token provided"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded; // Attach user data to the socket
    next();
  } catch (err) {
    return next(new Error("Authentication error: Invalid token"));
  }
});

// WebSocket connection handling
io.on("connection", (socket) => {
  console.log("A user connected:", socket.user);

  // Join a room based on user ID
  const room = `room_${socket.user.id}`; // Ensure `socket.user.id` is set
  socket.join(room);

  // Fetch chat history for the room
  PtoDChat.find({ roomID: room })
    .sort({ timeStamp: 1 })
    .then((messages) => {
      socket.emit("chat_history", messages); // Emit chat history to the client
    });

  // Handle incoming messages
  socket.on("send_message", async (data) => {
    const { message } = data;

    if (!message) {
      return socket.emit("error", { message: "Invalid message format" });
    }

    // Save the message to the database
    const chatMessage = new PtoDChat({
      roomID: room,
      senderRole: socket.user.role, // Use the role from the authenticated user
      message,
    });
    await chatMessage.save();

    // Broadcast the message to the room
    io.to(room).emit("receive_message", chatMessage);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.user);
  });
});

console.log("WebSocket server is running!");