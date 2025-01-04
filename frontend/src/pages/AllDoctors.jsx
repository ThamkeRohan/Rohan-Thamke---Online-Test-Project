import React, { useEffect, useState } from 'react'
import DoctorCard from '../components/DoctorCard';

export default function AllDoctors() {
    const [doctors, setDoctors] = useState([])
    useEffect(() => {
      const fetchDoctor = async () => {
        try {
          const res = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/api/doctors`, {
            headers: {
              "Authorization": `Bearer ${
                JSON.parse(localStorage.getItem("USER_AUTH")).token
              }`,
            },
          });
          const data = await res.json()
          if(res.ok) {
              setDoctors(data);
          }
          else {
            alert(data.message)
          }
        } catch (error) {
          alert(data.message);
        }
      };
      fetchDoctor();
    }, []);
  return (
    <div className='grid'>
      {
        doctors?.length > 0 && doctors.map(doctor => <DoctorCard key={doctor._id} {...doctor}/>)
      }
    </div>
  )
}
