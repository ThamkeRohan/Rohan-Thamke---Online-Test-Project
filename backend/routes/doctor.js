const express = require("express");
const {
  getDoctors,
  getDoctor,
  getDoctorsConsultations,
} = require("../controllers/doctor");
const auth = require("../middlewares/auth")

const router = express.Router();

router.use(auth)

router.get("/", getDoctors);
router.get("/:doctorId", getDoctor);
router.get("/:doctorId/consultations", getDoctorsConsultations);

module.exports = router;
