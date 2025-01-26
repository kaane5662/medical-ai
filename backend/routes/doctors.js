import express from "express"
const router = express.Router()
import { verifyToken } from "../jwtMiddleware.js"
import Doctor from "../schemas/Doctor.js"
import Log from "../schemas/Log.js"
import Patient from "../schemas/Patient.js"

router.post("/doctor", async (req, res) => {
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
    } = req.body;
  
    try {
      // Create a new doctor if none exists
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
      });
      await doctor.save();
      res.status(201).json({ message: "Doctor created successfully", doctor });
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
        const doctorId = await req.user._id
        const logs = await Patient.find({doctor:doctorId, paitent:patientId})
        if(logs == null) res.status(404).json({error:"Not found"})
        res.status(200).json(logs)
    }catch(error){
        console.log(error)
        res.status(500).json({error:"Unexpected error occured"})
    }
})
router.post("/patients/logs",verifyToken,async(req,res)=>{
    const {patientId} = req.body
    try{
        const doctorId = await req.user._id
        const logs = await Patient.find({doctor:doctorId, paitent:patientId})
        if(logs == null) res.status(404).json({error:"Not found"})
        res.status(200).json(logs)
    }catch(error){
        console.log(error)
        res.status(500).json({error:"Unexpected error occured"})
    }
})




export {router}