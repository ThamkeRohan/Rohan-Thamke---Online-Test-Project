import React from 'react'
import {useAuth} from "../contexts/AuthContext"
import { useNavigate } from 'react-router-dom';
import jsPDF from "jspdf";

export default function ConsultationCard(consultation) {
    const auth = useAuth()
    const navigate = useNavigate()
    function printPrescription() {
      const pdf = new jsPDF();
      pdf.text(`Date: ${consultation.createdAt}`, 10, 10)
      pdf.text(`Patient: ${consultation.patient.name}`, 10, 20)
      pdf.text(`Doctor: ${consultation.doctor.name}`, 10, 30)
      pdf.text(`Care to Be Taken: ${consultation.prescription[0].careToBeTaken}`, 10, 40);
      pdf.text(`Medicines: ${consultation.prescription[0].medicines}`, 10, 50);
      pdf.save(`Prescription_${consultation._id}.pdf`);
    }
  return (
    <div className="card consultation-card">
      <div className="head">
        <p className="date">
          <strong>Date: </strong>
          {consultation.createdAt}
        </p>
        <div className="patient">
          <strong>Patient Name: </strong>
          {consultation.patient.name}
        </div>
        <div className="doctor">
          <strong>Doctor Name: </strong>
          {consultation.doctor.name}
        </div>
      </div>
      <hr />
      <div className="body">
        <p>
          <strong>Current Illnesss: </strong> {consultation.illnessHistory}
        </p>
        <p>
          <strong>Recent Surgery: </strong> {consultation.recentSurgery}
        </p>
        <p>
          <strong>Diabetes: </strong>{" "}
          {consultation.familyHistory.diabetes ? "Yes" : "No"}
        </p>
        <p>
          <strong>Allergies: </strong> {consultation.familyHistory.allergies}
        </p>
        <p>
          <strong>Others: </strong> {consultation.familyHistory.others}
        </p>
      </div>
      <div className="foot">
        {auth.user._id === consultation.doctor._id &&
          consultation.prescription?.length === 0 && (
            <button
              className="btn"
              onClick={() =>
                navigate(`/createPrescription/${consultation._id}`)
              }
            >
              Create Prescription
            </button>
          )}
        {auth.user._id === consultation.doctor._id &&
          consultation.prescription?.length > 0 && (
            <button
              className="btn"
              onClick={() =>
                navigate(
                  `/editPrescription/${consultation.prescription[0]._id}`
                )
              }
            >
              Edit Prescription
            </button>
          )}

        {consultation.prescription?.length > 0 && (
          <button
            className="btn"
            onClick={() =>
              navigate(`/viewPrescription/${consultation.prescription[0]._id}`)
            }
          >
            View Prescription
          </button>
        )}

        {consultation.prescription?.length > 0 && (
          <button className="btn" onClick={printPrescription}>
            Print Prescription
          </button>
        )}
      </div>
    </div>
  );
}
