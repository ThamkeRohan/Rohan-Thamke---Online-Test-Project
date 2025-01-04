const Doctor = require("../models/doctor")
const Consultation = require("../models/consultation")
const mongoose = require("mongoose")

async function getDoctors(req, res) {
    try {
      const doctors = await Doctor.find().sort({createdAt: 1})
      res.status(200).json(doctors)  
    } catch (err) {
        console.log(err)
        res.status(500).json({message: "Failed to get doctors"})
    }
}

async function getDoctor(req, res) {
  try {
    const doctor = await Doctor.findById(req.params.doctorId)
    console.log(req.params.doctorId)
    res.status(200).json(doctor)
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get doctor" });
  }
}

async function getDoctorsConsultations(req, res) {
  try {
    const consultations = await Consultation.aggregate([
      {
        $match: {
          doctor: new mongoose.Types.ObjectId(req.params.doctorId),
        },
      },
      {
        $lookup: {
          from: "doctors",
          localField: "doctor",
          foreignField: "_id",
          as: "doctor",
        },
      },
      {
        $unwind: "$doctor",
      },
      {
        $lookup: {
          from: "patients",
          localField: "patient",
          foreignField: "_id",
          as: "patient",
        },
      },
      {
        $unwind: "$patient",
      },
      {
        $lookup: {
          from: "prescriptions",
          localField: "_id",
          foreignField: "consultation",
          as: "prescription",
        },
      },
    ]);
    res.status(200).json(consultations)
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get doctors" });
  }
}

module.exports = {
    getDoctor,
    getDoctors,
    getDoctorsConsultations
}