const express = require("express");
const {
  createPrescription,
  editPrescription,
  getPrescription,

} = require("../controllers/prescription");
const auth = require("../middlewares/auth");
const router = express.Router();

router.use(auth);

router.post("/", createPrescription);
router.patch("/:prescriptionId", editPrescription);
router.get("/:prescriptionId", getPrescription);

module.exports = router;
