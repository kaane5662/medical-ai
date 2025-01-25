import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import {router as DoctorRouter} from "./routes/doctors.js"
import {router as PatientRouter} from "./routes/patients.js"
// const Transactions = require("./schemas/Transactions")
// const nodemailer = require("nodemailer")
// const qr = require("qr-image")
const app = express()
// const path = require("path")
import dotenv from "dotenv"
dotenv.config()
// const stripe = require("stripe")(process.env.STRIPE_KEY)
import cookieParser from "cookie-parser"
// const {sendStripeVerifcationProcessing, sendStripeVerificationVerified, sendStripeVerificationDenied, sendStripeBoarded, sendTicketConfirmation} = require("./helpers/emailer")









console.log(process.env.MONGO_URL)

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(()=> console.log("DB connected!"))
    .catch((error)=>{
        console.log(error.message)
})




const corsOptions = {
    origin: "http://localhost:3000",
    origin: [],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,  // Enable cookies and authentication headers
};

app.use(cors(corsOptions));
app.use(cookieParser());

app.use(express.json())
app.use("/doctors", DoctorRouter)
app.use("/patients", PatientRouter)


//routes

app.listen(5000, ()=>{console.log("Listening on port 5000!")})
