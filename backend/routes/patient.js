import express, { Request, Response } from "express";
import Patient from "../schemas/Patient";
import mongoose from "mongoose";
import { verifyToken } from "../jwtMiddleware"
import { AIChat, AIMessage } from "../schemas/AIChat";
import { randomUUID } from "crypto";
import bcryptjs from "bcryptjs"
const router = express.Router();
import Anthropic from "@anthropic-ai/sdk/index.mjs";
const anthropic = Anthropic({apiKey:process.env.ANTHROPIC_API_KEY})

// POST route to create a new patient
router.post("/", async(req, res ) => {
  try{
    const {
      firstName,
      lastName,
      hasInsurance,
      insuranceNumber,
      insuranceProvider,
      insurancePlan,
      username,
      email,
      password,
      confirmPassword
    } = req.body;
    if(confirmpassword != password) return res.status(500).json({error:"Passwords do not match!"})
    if(password.length < 8) return res.status(500).json({error: "Password must be at least 8 characters!"})
    if(email.split("@").length != 2 || email.split(".").length != 2) return res.status(500).json({error:"Must be a valid email!"})
    const hashedPassword = await bcryptjs.hash(password, 10)
    const newPatient = new Patient({
      firstName,
      lastName,
      hasInsurance,
      insuranceNumber,
      insuranceProvider,
      insurancePlan,
      username,
      email,
      password:hashedPassword
    })
    
    const savedPatient = await newPatient.save()
    const token = generateToken(savedPatient)
    res.cookie("token", token, { maxAge: 9000000 ,secure: process.env.NODE_ENV === "production", httpOnly:true, path:"/", sameSite: 'Lax' })
    return res.status(200).json("Cookies set")
  }catch(error){
    console.log(error)
  }

});
router.put("/", async(req, res ) => {
  try{
    const {
      username,
      password
    } = req.body;

    const patient = await Patient.findOne({username})
    if(patient == null) return res.status(404).json({error:"Not found"})
    const matchedPassword = await bcryptjs.compare(password, patient.password)
    if(!matchedPassword) return res.status(500).json({message: "Invalid password"})
    const token = generateToken(User)
    res.cookie("token", token, { maxAge: 9000000,secure: process.env.NODE_ENV === "production", httpOnly: true, path: "/", sameSite: 'Lax'  })
    return res.status(200).json("Cookies set")
   
  }catch(error){
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
  }

});

// GET route to fetch all patients
router.get("/", async (req , res ) => {
  try {
    const patients = await Patient.find() // Populate related fields
    return res.status(200).json({
      success: true,
      message: "Patients fetched successfully",
      data: patients,
    });
  } catch (error) {
    console.error("Error fetching patients:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// GET route to fetch a single patient by ID
router.get("/:id", async (req , res ) => {
  try {
    const patient = await Patient.findById(req.params.id).populate("doctors logs"); // Populate related fields
    
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Patient fetched successfully",
      data: patient,
    });
  } catch (error) {
    console.error("Error fetching patient:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// PUT route to update a patient by ID
router.put("/:id", async (req , res ) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedPatient = await Patient.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Run Mongoose validators on update
    });

    if (!updatedPatient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Patient updated successfully",
      data: updatedPatient,
    });
  } catch (error) {
    console.error("Error updating patient:", error);

    // Handle Mongoose validation errors
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    }

    // Handle duplicate key errors (e.g., unique email)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Generic server error
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// DELETE route to delete a patient by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPatient = await Patient.findByIdAndDelete(id);

    if (!deletedPatient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Patient deleted successfully",
      data: deletedPatient,
    });
  } catch (error) {
    console.error("Error deleting patient:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});


router.post("/aichat",verifyToken,async(req,res)=>{
  const {patientId} = req.body
  try{
      const patientId = await req.user._id
      const newChat = new AIChat({
        patientId:patientId,
        cache: randomUUID()
      })
      const savedChat = await newChat.save()
      res.status(201).json({aiChatId:savedChat._id})
  }catch(error){
      console.log(error)
      res.status(500).json({error:"Unexpected error occured"})
  }
})
router.get("/aichat/:id",[verifyToken],async(req,res)=>{
  const {id} = req.params
  try{
      const patientId = await req.user._id
      const chatHistory = await AIMessage.find({
        id:id,
        patientId: patientId
      })
      const savedChat = await newChat.save()
      res.status(201).json({aiChatId:savedChat._id})
  }catch(error){
      console.log(error)
      res.status(500).json({error:"Unexpected error occured"})
  }
})

router.put("/aichat/:id",[verifyToken],async(req,res)=>{
  const {text} = req.body
  const {id} = req.params
  try{
      const patientId = await req.user._id
      
      const message = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1024,
        temperature:0,
         system: "Make sure the response content is of TYPE text and be as helpful as possible.",
        messages: [
            {
                "role": "user", 
                "content":`Act as an AI Patient Care Provider Assistant designed to support healthcare professionals and patients. Your role is to provide accurate, empathetic, and timely assistance in the following areas:

                Patient Communication: Answer patient questions about symptoms, medications, treatments, and post-care instructions in a clear and compassionate manner.

                Appointment Management: Help schedule, reschedule, or cancel appointments, and send reminders to patients.

                Health Monitoring: Provide guidance on tracking vital signs, symptoms, or medication adherence, and alert healthcare providers if critical thresholds are met.

                Medical Information: Offer evidence-based information on conditions, procedures, and preventive care, while clarifying that you are not a substitute for professional medical advice.

                Emotional Support: Provide comforting and reassuring responses to patients experiencing stress, anxiety, or uncertainty about their health.

                Administrative Support: Assist with documentation, insurance queries, and referrals to specialists or resources.

                Always prioritize patient privacy and adhere to HIPAA or relevant data protection regulations. If a situation requires urgent or specialized attention, escalate it to a human healthcare provider immediately.

                Example Scenario: A patient messages you saying, 'I’ve been feeling dizzy and nauseous for two days. What should I do?' How would you respond?"
                `.trim(),
                
            },
        ]
      });
      if(!message.content) return {error:"No content"}
      const aiResponse = message.content[0].text
      await AIMessage.create({
        text,
        aiChat: id,
        role:"user"
      })
      await AIChat.create({
        text:aiResponse,
        role:"ai",
        aiChat:id
      })
      return res.status(201).json({})
  }catch(error){
      console.log(error)
      res.status(500).json({error:"Unexpected error occured"})
  }
})




export default router;