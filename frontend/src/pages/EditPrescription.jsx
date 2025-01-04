import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import PrescriptionForm from '../components/PrescriptionForm';

export default function EditPrescription() {
  const {prescriptionId} = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [prescription, setPrescription] = useState(null)

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
        console.log(err.message)
      }
    }
    fetchPrescription()
  }, [])

  function savePrescription(data) {
    return fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/api/prescriptions/${prescriptionId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${
          JSON.parse(localStorage.getItem("USER_AUTH")).token
        }`,
      },
      body: JSON.stringify(data),
    });
  }
  if(isLoading) {
    return "Loading..."
  }
  return (
    <div>
      <h1 className='page-title'>Edit Prescription</h1>
      <PrescriptionForm {...prescription} savePrescription={savePrescription} />
    </div>
  );
}
