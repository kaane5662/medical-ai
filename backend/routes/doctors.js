import express from "express"
const router = express.Router()
import { verifyToken } from "../jwtMiddleware.js"

verifyToken
router.post("/",(req,res)=>{
    const {firstName, lastName, specialty, doctorId, paitentName, hospitalName,} = req.body

})

router.get("/",verifyToken,async(req,res)=>{
    try{
        const doctorId = await req.user._id
        const doctor = await Doctor.findOne({id:doctorId})
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
router.get("/patients/logs",verifyToken,async(req,res)=>{
    const {patientId} = req.body
    try{
        const doctorId = await req.user._id
        const logs = await Paitent.find({doctor:doctorId, paitent:patientId})
        if(logs == null) res.status(404).json({error:"Not found"})
        res.status(200).json(logs)
    }catch(error){
        console.log(error)
        res.status(500).json({error:"Unexpected error occured"})
    }
})
router.put("/patients/logs",verifyToken,async(req,res)=>{
    const {patientId} = req.body
    try{
        
        const doctorId = await req.user._id
        const log = new Log({
            firstName:""
        })
        await log.save()
        
        res.status(201).json(log)
    }catch(error){
        console.log(error)
        res.status(500).json({error:"Unexpected error occured"})
    }
})



router.post("/protected",verifyToken,async(req,res)=>{

})

export {router}