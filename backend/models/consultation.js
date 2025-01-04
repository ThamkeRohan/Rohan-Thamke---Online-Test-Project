const mongoose = require("mongoose");

const consultationSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  illnessHistory: {type: String, required: true},
  recentSurgery: {type: String, required: true},
  familyHistory: {
    diabetes: Boolean,
    allergies: String,
    others: String,
  },
  transactionId: {type: String, required: true},
}, 
{timestamps: true});

module.exports = mongoose.model("Consultation", consultationSchema);
