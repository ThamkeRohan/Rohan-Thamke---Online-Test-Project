import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ConsultationCard from "../components/ConsultationCard";

export default function DoctorConsultations() {
  const [consultations, setConsultations] = useState([]);
  const { doctorId } = useParams();
  useEffect(() => {
    async function fetchDoctorConsultations() {
      const res = await fetch(
        `${
          import.meta.env.VITE_SERVER_BASE_URL
        }/api/doctors/${doctorId}/consultations`,
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
        setConsultations(data);
      } else {
        alert(data.message);
      }
    }
    fetchDoctorConsultations();
  }, []);
  console.log(consultations);
  return (
    <div>
      <h1 className="page-title">Doctor Consultations</h1>
      <div className="grid">
        {consultations.map((consultation) => (
          <ConsultationCard key={consultation._id} {...consultation} />
        ))}
      </div>
    </div>
  );
}
