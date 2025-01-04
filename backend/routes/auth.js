const express = require("express");
const {
  doctorSignUp,
  patientSignUp,
  login,
} = require("../controllers/auth");
const router = express.Router();

router.post("/doctors/signup", doctorSignUp);
router.post("/patients/signup", patientSignUp);
router.post("/login", login);

module.exports = router;
