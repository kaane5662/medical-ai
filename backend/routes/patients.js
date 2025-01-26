import express from "express";
import mongoose from "mongoose";
import { AIMessage } from "../schemas/AIChat.js";
import { randomUUID } from "crypto";
import Patient from "../schemas/Patient.js";
import { verifyToken, generateToken } from "../jwtMiddleware.js";
import bcryptjs from "bcryptjs"
import Anthropic from "@anthropic-ai/sdk";
import Doctor from "../schemas/Doctor.js";
import Log from "../schemas/Log.js";
import { misdiagnosisToolSchema } from "../tools.js";
const anthropic = new Anthropic({apiKey:process.env.ANTHROPIC_API_KEY})

const router = express.Router();
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
      confirmpassword
    } = req.body;
    // if(confirmpassword != password) return res.status(500).json({error:"Passwords do not match!"})
    if(password.length < 8) return res.status(500).json({error: "Password must be at least 8 characters!"})
    // if(email.split("@").length != 2 || email.split(".").length != 2) return res.status(500).json({error:"Must be a valid email!"})
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
    const token = generateToken(patient)
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
router.get("/aichat",verifyToken,async(req,res)=>{
  const {id} = req.params
  try{
      const patientId = await req.user._id
      if (!mongoose.Types.ObjectId.isValid(patientId)) {
        return res.status(400).json({ error: "Invalid patient ID" });
      }
      const chatHistory = await AIMessage.find({patient:patientId})
      res.status(201).json(chatHistory)
  }catch(error){
      console.log(error)
      res.status(500).json({error:"Unexpected error occured"})
  }
})
router.get("/logs", verifyToken,async (req , res ) => {
  try {
    console.log("hello from the world")
    const patientId = req.user._id
    console.log(patientId,"user thing")

    const logs = await Log.find({patient:patientId})
    
    // if (!patient) {
    //   return res.status(404).json({
    //     success: false,
    //     error: "Patient not found",
    //   });
    // }
    return res.status(200).json(logs);
    
  } catch (error) {
    console.error("Error fetching patient:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});


// GET route to fetch patient
router.get("/patient", verifyToken,async (req , res ) => {
  try {
    const patientId = req.user._id
    const patients = await Patient.findById(patientId).populate("logs") // Populate related fields
    
    return res.status(200).json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});
router.get("/doctors", verifyToken,async (req , res ) => {
  try {
    const patientId = req.user._id
    const doctors = await Doctor.find({patient:patientId}) // Populate related fields
    if(doctors == null) return res.status(404)
    return res.status(200).json(doctors);
  } catch (error) {
    console.error("Error fetching patients:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});


  
router.post("/doctors", verifyToken ,async(req,res)=>{
  const {firstName, lastName, specialty, hospitalName} =  req.body

  try {
    const patientId = req.user._id
    const doctor = await Doctor.findById({
      firstName,
      lastName,
      specialty,
      hospitalName
    });
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found." });
    }
    // Find the patient and update their doctors array
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found." });
    }

    // Check if the doctor is already added
    if (patient.doctors.includes(doctor._id)) {
      return res.status(400).json({ error: "Doctor already assigned to this patient." });
    }

    // Add the doctor to the patient's doctors array
    patient.doctors.push(doctor._id);
    await patient.save();
  } catch (error) {
    console.error("Error fetching patients:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
})

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

router.post("/logs", verifyToken,async (req, res) => {
  try {
    const {
      symptoms,
      glucose,
      bloodPressure,
      medications,
      frequency,
      timestamp,
      diagnosis,
      description,
      // patientId,
      doctorId,
    } = req.body;

    // Validate patient exists
    const patientId = req.user._id
    console.log("user",patientId)
    if (!patientId) {
      return res.status(404).json({
        success: false,
        error: "Patient not found",
      });
    }

    // Create a new log
    const newLog = new Log({
      symptoms,
      glucose,
      bloodPressure,
      medications,
      frequency,
      timestamp: timestamp || new Date(),
      diagnosis,
      description,
      patient: patientId
      // patient: patientId,
      // doctor: doctorId,
    });

    // Save the log to the database
    await newLog.save();

    return res.status(201).json({
      success: true,
      message: "Log created successfully",
      data: newLog,
    });
  } catch (error) {
    console.error("Error creating log:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});


router.put("/logs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      symptoms,
      glucose,
      bloodPressure,
      medications,
      frequency,
      timestamp,
      diagnosis,
      description,
    } = req.body;

    // Validate the input fields (if necessary, add more validation rules here)
    if (!id || !updates) {
      return res.status(400).json({
        success: false,
        message: "Log ID and update data are required",
      });
    }

    const updateFields = {
      ...(symptoms && { symptoms }),
      ...(glucose && { glucose }),
      ...(bloodPressure && { bloodPressure }),
      ...(medications && { medications }),
      ...(frequency && { frequency }),
      ...(timestamp && { timestamp }),
      ...(diagnosis && { diagnosis }),
      ...(description && { description }),
    };

    // Find the log by ID and update it
    const updatedLog = await Log.findByIdAndUpdate(id, updateFields, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation rules are applied
    });

    if (!updatedLog) {
      return res.status(404).json({
        success: false,
        message: "Log not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Log updated successfully",
      log: updatedLog,
    });
  } catch (error) {
    console.error("Error updating log:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});


router.get("/doctors/:id", verifyToken,async (req, res) => {
  try {
    const { id } = req.params;
    const patientId = req.user._id
    // Find the patient by ID and populate the 'doctors' field
    const patient = await Patient.findById(patientId).populate("doctors");

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    return res.status(200).json(patient.doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

router.post("/searchdoctors", async (req, res) => {
  try {
    const { specialty, hospitalName, boardCertifications, name } = req.query;

    // Build the search query dynamically
    const query = {};

    if (specialty) {
      query.specialty = { $regex: specialty, $options: "i" }; // Case-insensitive partial match
    }

    if (hospitalName) {
      query.hospitalName = { $regex: hospitalName, $options: "i" };
    }

    if (boardCertifications) {
      query.boardCertifications = { $regex: boardCertifications, $options: "i" };
    }

    if (name) {
      query.$or = [
        { firstName: { $regex: name, $options: "i" } },
        { lastName: { $regex: name, $options: "i" } },
      ];
    }

    // Fetch doctors matching the query
    const doctors = await Doctor.find(query);

    if (doctors.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No doctors found matching the criteria",
      });
    }

    return res.status(200).json({
      success: true,
      doctors,
    });
  } catch (error) {
    console.error("Error searching for doctors:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
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

// router.post("/aichat",verifyToken,async(req,res)=>{
//   const {patientId} = req.body
//   try{
//       const patientId = await req.user._id
//       const newChat = new AIChat({
//         patientId:patientId,
//         cache: randomUUID()
//       })
//       const savedChat = await newChat.save()
//       res.status(201).json({aiChatId:savedChat._id})
//   }catch(error){
//       console.log(error)
//       res.status(500).json({error:"Unexpected error occured"})
//   }
// })

router.post("/aichat",verifyToken,async(req,res)=>{
  const {text} = req.body
  const {id} = req.params
  try{
      console.log("Hello thre")
      const patientId = await req.user._id
      
      const message = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1024,
        temperature:0,
         system: "Act as an AI Patient Care Provider Assistant designed to support healthcare professionals and patients who provides professional advice. If a user feels misdiagnosed run the misdiagnosis tool schema",
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
              
                Here is what the user asks: ${text}
                
                `.trim(),
                
            },
            
        ],
        tools: [misdiagnosisToolSchema]
      });
      console.log(message)
      if(!message.content) return {error:"No content"}
      const aiResponse = message.content[0].text
      if(message.stop_reason == "tool_use"){
        let input = message.content[1].input
        input = {
          ...input,
          "Cholesterol Level": input.cholesterol_level,
          "Blood Pressure":input.blood_pressure,

        }
        const res = await fetch(`${process.env.AI_BACKEND}/predict`,{
          method:"POST", 
          headers: {
            "Content-Type": "application/json" // Specify the content type as JSON
          },
          body: JSON.stringify(input)
            
        })
        const data = await res.json()
        console.log(data)
      }
      
      const userBubble = await AIMessage.create({
        text,
        aiChat: id,
        role:"user",
        patient: patientId
      })
      const aiBubble = await AIMessage.create({
        text:aiResponse,
        role:"ai",
        aiChat:id,
        patient:patientId
      })
      return res.status(201).json({userBubble,aiBubble})
  }catch(error){
      console.log(error)
      res.status(500).json({error:"Unexpected error occured"})
  }
})




export {router};