const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  profilePicture: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  historyOfSurgery: { type: String, required: true },
  historyOfIllness: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("Patient", patientSchema);
