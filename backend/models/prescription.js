const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema(
  {
    consultation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Consultation",
      required: true,
    },
    careToBeTaken: { type: String, required: true },
    medicines: { type: String, required: true },
    pdfPath: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Prescription", prescriptionSchema);
