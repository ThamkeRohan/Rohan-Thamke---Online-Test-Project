const express = require("express");
const {
  getPatient,
  getPatientsConsultations,
} = require("../controllers/patient");

const router = express.Router();

router.get("/:patientId", getPatient);
router.get("/:patientId/consultations", getPatientsConsultations);

module.exports = router;
