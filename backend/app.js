require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const consultationRoutes = require("./routes/consultation");
const doctorRoutes = require("./routes/doctor")
const patientRoutes = require("./routes/patient")
const prescriptionRoutes = require("./routes/prescription");

const app = express();

app.use(express.json());
app.use(cors());


app.use("/api/auth", authRoutes);
app.use("/api/consultations", consultationRoutes);
app.use("/api/doctors", doctorRoutes)
app.use("/api/patients", patientRoutes);
app.use("/api/prescriptions", prescriptionRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));
