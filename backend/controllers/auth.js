const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Doctor = require("../models/doctor");
const Patient = require("../models/patient");

async function doctorSignUp(req, res){
  try {
    const { name, specialty, email, phone, yearsOfExperience, profilePicture, password } =
      req.body;
      console.log(req.body)

    const existingDoctor = await Doctor.findOne({$or: [{email}, {phone}]}) 

    if(existingDoctor != null) {
      return res.status(400).json({message: "Doctor with given email or phone already exists"})
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newDoctor = new Doctor({
      name,
      specialty,
      email,
      phone,
      yearsOfExperience,
      profilePicture,
      password: hashedPassword,
    });
    await newDoctor.save();

    const token = jwt.sign({ _id: newDoctor._id, role: "doctor" }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(201).json({ user: newDoctor, token, role: "doctor" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Failed to register doctor" });
  }
};

async function patientSignUp(req, res) {
  try {
    const {
      name,
      profilePicture,
      age,
      email,
      phone,
      historyOfSurgery,
      historyOfIllness,
      password,
    } = req.body;

    const existingPatient = await Patient.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingPatient != null) {
      return res
        .status(400)
        .json({ message: "Patient with given email or phone already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const patient = new Patient({
      name,
      profilePicture,
      age,
      email,
      phone,
      historyOfSurgery,
      historyOfIllness,
      password: hashedPassword,
    });
    await patient.save();

    const token = jwt.sign(
      { _id: patient._id, role: "patient" },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res.status(201).json({ user: patient, token, role: "patient" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Failed to register patient" });
  }
};


async function login(req, res){
  try {
    const { email, password, role } = req.body;

    const userModel = role === "doctor" ? Doctor : Patient;
    const user = await userModel.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ _id: user._id, role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ user, token, role });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Login failed" });
  }
};

module.exports = {
    doctorSignUp,
    patientSignUp,
    login
};
