import express, { Request, Response } from "express";
import Paitent from "../schemas/Patient";
import mongoose from "mongoose";
import {verifyToken} from "../jwtMiddleware";
const router = express.Router();


// POST route to create a new patient
router.post("/", (req: Request<any>, res: any) => {
    const {
      firstName,
      lastName,
      insuranceId,
      insurancePlan,
      email,
      doctors,
      logs,
    } = req.body;


    // Validate required fields
    if (!firstName || !lastName || !insuranceId || !insurancePlan || !email) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: firstName, lastName, insuranceId, insurancePlan, email",
      });
    }

    // Create a new patient document
    const newPatient = new Paitent({
      firstName,
      lastName,
      insuranceId,
      insurancePlan,
      email,
      doctors: doctors || [], // Optional field
      logs: logs || [], // Optional field
    });

    // Save the patient to the database
    const savedPatient = await newPatient.save();

    // Return the saved patient
    return res.status(201).json({
      success: true,
      message: "Patient created successfully",
      data: savedPatient,
    });

    // Handle Mongoose validation errors
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    }

    // Handle duplicate key errors (e.g., unique email)
    if ( === 11000) {
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

// GET route to fetch all patients
router.get("/", async (req: Request<any>, res: any) => {
  try {
    const patients = await Paitent.find().populate("doctors logs"); // Populate related fields
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
router.get("/:id", async (req: Request<any>, res: any) => {
  try {
    const patient = await Paitent.findById(req.params.id).populate("doctors logs"); // Populate related fields

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
router.put("/:id", async (req: Request<any>, res: any) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedPatient = await Paitent.findByIdAndUpdate(id, updateData, {
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
router.delete("/:id", async (req: Request<any>, res: any) => {
  try {
    const { id } = req.params;

    const deletedPatient = await Paitent.findByIdAndDelete(id);

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

export default router;