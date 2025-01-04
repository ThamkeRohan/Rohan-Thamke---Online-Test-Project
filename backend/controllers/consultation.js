const Consultation = require("../models/consultation");
const mongoose = require("mongoose")

async function createConsultation(req, res) {
  try {
    const {
      patientId,
      doctorId,
      illnessHistory,
      recentSurgery,
      familyHistory,
      transactionId,
    } = req.body;

    if(req.user.role !== "patient") {
      return res.status(403).json({ message: "Only patients have permission to create consultation" });
    }
    if (req.user._id !== patientId) {
      return res.status(403).json({
        message:
          "You don not have permission to create consultation for this user",
      });
    }

    const consultation = new Consultation({
      patient: patientId,
      doctor: doctorId,
      illnessHistory,
      recentSurgery,
      familyHistory,
      transactionId,
    });

    await consultation.save();
    res.status(201).json({ message: "Consultation created successfully" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Failed to create consultation", details: err.message });
  }
}

module.exports = { createConsultation };
