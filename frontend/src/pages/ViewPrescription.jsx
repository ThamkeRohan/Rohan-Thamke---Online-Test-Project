import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function ViewPrescription() {
  const { prescriptionId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [prescription, setPrescription] = useState(null);
  useEffect(() => {
    async function fetchPrescription() {
      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_SERVER_BASE_URL
          }/api/prescriptions/${prescriptionId}`,
          {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("USER_AUTH")).token
              }`,
            },
          }
        );
        const data = await res.json();
        if (res.ok) {
          setPrescription(data);
          setIsLoading(false);
        } else {
          alert(data.message);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchPrescription();
  }, []);

  if (isLoading) {
    return "Loading...";
  }
  const date = new Date(prescription.createdAt);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
  

  return (
    <div>
      <h1 className="page-title">Prescription</h1>
      <div className="prescription">
        <p>
          <strong>Date: </strong> {formattedDate}
        </p>
        <p>
          <strong>Patient: </strong> {prescription.patient.name}
        </p>
        <p>
          <strong>Doctor: </strong> {prescription.doctor.name}
        </p>
        <hr />
        <br />
        <p>
          <strong>Care to be taken: </strong> {prescription.careToBeTaken}
        </p>
        <p>
          <strong>Medicines: </strong> {prescription.medicines}
        </p>
      </div>
    </div>
  );
}
