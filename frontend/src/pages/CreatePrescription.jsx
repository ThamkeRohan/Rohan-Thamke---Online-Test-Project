import React from 'react'
import PrescriptionForm from '../components/PrescriptionForm';

export default function CreatePrescription() {
    function savePrescription(data) {
        return fetch(
          `${import.meta.env.VITE_SERVER_BASE_URL}/api/prescriptions`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${
                JSON.parse(localStorage.getItem("USER_AUTH")).token
              }`,
            },
            body: JSON.stringify(data)
          }
        );
    }
  return (
    <div>
      <h1 className='page-title'>Create Prescription</h1>
      <PrescriptionForm savePrescription={savePrescription}/>
    </div>
  )
}
