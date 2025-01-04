const Patient = require("../models/patient")
const Consultation = require("../models/consultation")
const mongoose = require("mongoose")

async function getPatient(req, res) {
    try {
        const patient = await Patient.findById(req.params.patientId)
        res.status(200).json(patient)
    } catch (err) {
        console.log(err)
        res.status(500).json({message: "Failed to get patient"})
    }
}

async function getPatientsConsultations(req, res) {
    try {
        const consultations = await Consultation.aggregate([
          {
            $match: {
              patient: new mongoose.Types.ObjectId(req.params.patientId),
            },
          },
          {
            $lookup: {
              from: "doctors",
              localField: "doctor",
              foreignField: "_id",
              as: "doctor"
            }
          }, 
          {
            $unwind: "$doctor"
          },
          {
            $lookup: {
              from: "patients",
              localField: "patient",
              foreignField: "_id",
              as: "patient"
            }
          },
          {
            $unwind: "$patient"
          },
          {
            $lookup: {
              from: "prescriptions",
              localField: "_id",
              foreignField: "consultation",
              as: "prescription"
            },
          },

        ]);
        res.status(200).json(consultations)
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to get patient's consultations" });
    }
}

module.exports = {
    getPatient,
    getPatientsConsultations
}