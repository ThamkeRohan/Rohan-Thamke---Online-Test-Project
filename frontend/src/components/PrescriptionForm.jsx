import React, { useState } from "react";
import jsPDF from "jspdf";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrescriptionForm = ({
    careToBeTaken = "",
    medicines = "",
    savePrescription
}) => {
  const [formData, setFormData] = useState({
    careToBeTaken,
    medicines,
  });
  const {consultationId} = useParams()
  const navigate = useNavigate()
  const auth = useAuth()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await savePrescription({...formData, consultationId})
        const data = await res.json()
        if(res.ok) {
            const pdf = new jsPDF();
            pdf.text(`Care to Be Taken: ${formData.careToBeTaken}`, 10, 10);
            pdf.text(`Medicines: ${formData.medicines}`, 10, 20);
            pdf.save(`Prescription_${consultationId}.pdf`);

            alert(data.message);
            navigate(`/doctorConsultations/${auth.user._id}`)
        }
        else {
            alert(data.message)
        }
      
    } catch (error) {
      alert("Submission failed: " + error.message);
    }
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <textarea
          className="field"
          name="careToBeTaken"
          placeholder="Care to Be Taken"
          onChange={handleChange}
          value={formData.careToBeTaken}
          required
        />
        <textarea
          className="field"
          name="medicines"
          placeholder="Medicines"
          value={formData.medicines}
          onChange={handleChange}
        />
        <button className="submit-btn" type="submit">Save Prescription</button>
      </form>
    </div>
  );
};

export default PrescriptionForm;
