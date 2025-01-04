const Prescription = require("../models/prescription");
const Consultation = require("../models/consultation");
const Patient = require("../models/patient")
const Doctor = require("../models/doctor")
const mongoose = require("mongoose")

// Create a Prescription
async function createPrescription(req, res){
  try {
    const { consultationId, careToBeTaken, medicines } = req.body;

    const prescription = new Prescription({
      consultation: consultationId,
      careToBeTaken,
      medicines,
    });

    await prescription.save();
    res.status(201).json({ message: "Prescription created successfully" });
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({ message: "Failed to create prescription"});
  }
};

async function editPrescription(req, res) {
  try {
    const { careToBeTaken, medicines } = req.body;
    const prescription = await Prescription.findById(req.params.prescriptionId)
    prescription.careToBeTaken = careToBeTaken
    prescription.medicines = medicines
    await prescription.save();
    res.status(201).json({ message: "Prescription edited successfully" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Failed to edit prescription"});
  }
}

async function getPrescription(req, res) {
  try {
    const { prescriptionId } = req.params;
    const prescription = await Prescription.findById(prescriptionId);
    const {patient: patientId, doctor: doctorId} = await Consultation.findById(prescription.consultation)
    const patient = await Patient.findById(patientId)
    const doctor = await Doctor.findById(doctorId)
    res.status(200).json({
      _id: prescription._id,
      careToBeTaken: prescription.careToBeTaken,
      medicines: prescription.medicines,
      consultation: prescription.consultation,
      createdAt: prescription.createdAt,
      patient,
      doctor
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get prescription" });
  } 
}



module.exports = {
  createPrescription,
  editPrescription,
  getPrescription,
}



