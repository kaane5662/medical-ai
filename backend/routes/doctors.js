import express from "express"
const router = express.Router()
import { verifyToken } from "../jwtMiddleware.js"
import Doctor from "../schemas/Doctor.js"
import Log from "../schemas/Log.js"
import Patient from "../schemas/Patient.js"
import bcryptjs from "bcryptjs"

router.post("/", async (req, res) => {
    const {
      firstName,
      lastName,
      specialty,
      malPracticeId,
      patients,
      licenceNumber,
      hospitalName,
      boardCertifications,
      email,
      username,
      phoneNumber,
      password,
      confirmpassword
    } = req.body;
  
    try {
      // Create a new doctor if none exists
      if(confirmpassword != password) return res.status(500).json({error:"Passwords do not match!"})
        if(password.length < 8) return res.status(500).json({error: "Password must be at least 8 characters!"})
        // if(email.split("@").length != 2 || email.split(".").length != 2) return res.status(500).json({error:"Must be a valid email!"})
        const hashedPassword = await bcryptjs.hash(password, 10)
      const doctor = new Doctor({
        firstName,
        lastName,
        specialty,
        malPracticeId,
        patients,
        licenceNumber,
        hospitalName,
        boardCertifications,
        email,
        username,
        phoneNumber,
        password:hashedPassword
      });
      await doctor.save();
      res.status(201).json({ message: "Doctor created successfully", doctor });
    } catch (error) {
        console.log(error)
        if (error.name === 'ValidationError') {
            // Handle Mongoose validation errors
            const errors = Object.values(error.errors).map(err => ({
                field: err.path,
                message: err.message
            }));
            return res.status(400).json({
                error: "Validation Error",
                details: errors
            });
          }
          if (error.code === 11000) {
            // Extract the duplicate field(s)
            const duplicateField = Object.keys(error.keyValue)[0];
            const duplicateValue = error.keyValue[duplicateField];
            res.status(400).json({
              error: `Duplicate value found: ${duplicateField} '${duplicateValue}' is already in use.`,
            });
          }
      res.status(500).json({ error: "Error creating/updating doctor", error });

    }
});
router.put("/", async (req, res) => {
    const {
      username,
      password
    } = req.body;
  
    try {
      // Create a new doctor if none exists
      const doctor = await Doctor.findOne({username})
        if(doctor == null) return res.status(404).json({error:"Not found"})
        const matchedPassword = await bcryptjs.compare(password, doctor.password)
        if(!matchedPassword) return res.status(500).json({message: "Invalid password"})
        const token = generateToken(doctor)
        res.cookie("token", token, { maxAge: 9000000,secure: process.env.NODE_ENV === "production", httpOnly: true, path: "/", sameSite: 'Lax'  })
        return res.status(200).json("Cookies set")
   
    } catch (error) {
        if (error.name === 'ValidationError') {
            // Handle Mongoose validation errors
            const errors = Object.values(error.errors).map(err => ({
                field: err.path,
                message: err.message
            }));
            return res.status(400).json({
                error: "Validation Error",
                details: errors
            });
          }
          if (error.code === 11000) {
            // Extract the duplicate field(s)
            const duplicateField = Object.keys(error.keyValue)[0];
            const duplicateValue = error.keyValue[duplicateField];
            res.status(400).json({
              error: `Duplicate value found: ${duplicateField} '${duplicateValue}' is already in use.`,
            });
          }
      res.status(500).json({ error: "Error creating/updating doctor", error });

    }
});

router.get("/",verifyToken,async(req,res)=>{
    try{
        const doctorId = await req.user._id
        const doctor = await Doctor.findById(doctorId)
        if(doctor == null) res.status(404).json({error:"Not found"})
        res.status(200).json()
    }catch(error){
        console.log(error)
        res.status(500).json({error:"Unexpected error occured"})
    }

})
router.get("/patients",verifyToken,async(req,res)=>{
    const {page, resultsPerPage, firstName, lastName, paitentId} = req.body
    try{
        console.log("user",req.user)
        const doctorId = await req.user._id
        
        const paitents = await Log.find({doctor:doctorId})
        if(paitents == null) res.status(404).json({error:"Not found"})
        res.status(200).json(paitents)
    }catch(error){
        console.log(error)
        res.status(500).json({error:"Unexpected error occured"})
    }
})

router.get("/patients",verifyToken,async(req,res)=>{
    const {page, resultsPerPage, firstName, lastName, paitentId} = req.body
    try{
        const doctorId = await req.user._id
        const paitents = await Log.find({doctor:doctorId})
        if(paitents == null) res.status(404).json({error:"Not found"})
        res.status(200).json(paitents)
    }catch(error){
        console.log(error)
        res.status(500).json({error:"Unexpected error occured"})
    }
})
router.get("/patients/logs",verifyToken,async(req,res)=>{
    const {patientId} = req.body
    try{
        console.log("user",req.user)
        const doctorId = await req.user._id
        const logs = await Log.find({doctor:doctorId, paitent:patientId})
        if(logs == null) res.status(404).json({error:"Not found"})
        res.status(200).json(logs)
    }catch(error){
        console.log(error)
        res.status(500).json({error:"Unexpected error occured"})
    }
})




export {router}