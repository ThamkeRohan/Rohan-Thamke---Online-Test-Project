import React, { useState } from "react";
import StepOne from "../components/StepOne";
import StepTwo from "../components/StepTwo";
import StepThree from "../components/StepThree";
import {useAuth} from "../contexts/AuthContext"
import {useNavigate, useParams} from "react-router-dom"

const CreateConsultation = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    illnessHistory: "",
    recentSurgery: "",
    familyHistory: {
      diabetes: "Non-Diabetics",
      allergies: "",
      others: "",
    },
    transactionId: "",
  });
  const auth = useAuth()
  const {doctorId} = useParams()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (step === 2) {
      setFormData((prev) => ({
        ...prev,
        familyHistory: {
          ...prev.familyHistory,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const nextStep = () => setStep((prev) => prev + 1);

  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/consultations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${
              JSON.parse(localStorage.getItem("USER_AUTH")).token
            }`,
          },
          body: JSON.stringify({
            patientId: auth.user._id,
            doctorId,
            ...formData,
            familyHistory: {
              ...formData.familyHistory,
              diabetes: formData.familyHistory.diabetes === "Diabetics",
            },
          }),
        }
      );
      const data = await res.json()
      if(res.ok) {
        alert("Consultation submitted successfully!");
        navigate("/")
      }
      else {
        alert(data.message)
      }
      
    } catch (error) {
      alert("Submission failed: " + error.response.data.error);
    }
  };

  // Render step-specific content
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <StepOne
            illnessHistory={formData.illnessHistory}
            recentSurgery={formData.recentSurgery}
            handleChange={handleChange}
          />
        );
      case 2:
        return (
          <StepTwo
            diabetes={formData.familyHistory.diabetes}
            allergies={formData.familyHistory.allergies}
            others={formData.familyHistory.others}
            handleChange={handleChange}
          />
        );
      case 3:
        return (
          <StepThree
            transactionId={formData.transactionId}
            handleChange={handleChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <form className="form consultation" onSubmit={handleSubmit}>
      <h2>Step {step} of 3</h2>
      {renderStepContent()}
      <div>
        {step > 1 && (
          <button className="btn" type="button" onClick={prevStep}>
            Back
          </button>
        )}
        {step < 3 && (
          <button className="btn" type="button" onClick={nextStep}>
            Next
          </button>
        )}
        {step === 3 && <button className="btn" type="submit">Submit</button>}
      </div>
    </form>
  );
};

export default CreateConsultation;
