import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ConsultationCard from '../components/ConsultationCard'

export default function PatientConsultations() {
    const [consultations, setConsultations] = useState([])
    const {patientId} = useParams()
    useEffect(() => {
        async function fetchPatientConsultations() {
            const res = await fetch(
              `${
                import.meta.env.VITE_SERVER_BASE_URL}/api/patients/${patientId}/consultations`,
              {
                headers: {
                  Authorization: `Bearer ${
                    JSON.parse(localStorage.getItem("USER_AUTH")).token
                  }`,
                },
              }
            );
            const data = await res.json()
            if(res.ok) {
                setConsultations(data)
            }
            else {
                alert(data.message)
            }  
        }
        fetchPatientConsultations()
    }, [])
    console.log(consultations)
  return (
    <div>
      <h1>Patient Consultations</h1>
      <div className="grid">
        {consultations.map((consultation) => (
          <ConsultationCard key={consultation._id} {...consultation} />
        ))}
      </div>
    </div>
  );
}
