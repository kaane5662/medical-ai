import express from "express"
const mongoose = require("mongoose")
const cors = require("cors")
import {router as DoctorRouter} from "./routes/doctors"
// const Transactions = require("./schemas/Transactions")
// const nodemailer = require("nodemailer")
// const qr = require("qr-image")
const app = express()
// const path = require("path")
require("dotenv").config()
// const stripe = require("stripe")(process.env.STRIPE_KEY)
const cookieParser = require('cookie-parser');
// const {sendStripeVerifcationProcessing, sendStripeVerificationVerified, sendStripeVerificationDenied, sendStripeBoarded, sendTicketConfirmation} = require("./helpers/emailer")









console.log(process.env.MONGO_URL)

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(()=> console.log("DB connected!"))
    .catch((error:any)=>{
        console.log(error.message)
})




const corsOptions = {
    origin: process.env.CLIENT_DOMAIN,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,  // Enable cookies and authentication headers
};

app.use(cors(corsOptions));
app.use(cookieParser());

app.use(express.json())
app.use("/doctors", DoctorRouter)


//routes

app.listen(5000, ()=>{console.log("Listening on port 8000!")})
