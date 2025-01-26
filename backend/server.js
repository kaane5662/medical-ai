import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { router as DoctorRouter } from "./routes/doctors.js";
import { router as PatientRouter } from "./routes/patients.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
// import { Server } from "socket.io"; // Import socket.io (commented out)
// import jwt from "jsonwebtoken"; // Import JWT for token verification (commented out)
// import PtoDChat from "./schemas/PtoDChat.js"; // Adjust the path to your schema (commented out)

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
const PORT = 5001;
const expressServer = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});