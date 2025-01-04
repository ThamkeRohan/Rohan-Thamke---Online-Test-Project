const express = require("express");
const {
  createConsultation,
} = require("../controllers/consultation");
const auth = require("../middlewares/auth")
const router = express.Router();

router.use(auth)

router.post("/", createConsultation);

module.exports = router;
