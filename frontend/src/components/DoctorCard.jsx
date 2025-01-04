import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function DoctorCard(doctor) {
    const navigate = useNavigate()
  return (
    <div className="card doctor-card">
      <div className="profile-img-container">
        <img src={doctor.profilePicture} alt="Profile" />
      </div>

      <p>
        <strong>Name:</strong> {doctor.name}
      </p>
      <p>
        <strong>Specialty:</strong> {doctor.specialty}
      </p>
      <button className='btn' onClick={() => navigate(`/createConsultation/${doctor._id}`)}>
        Consult
      </button>
    </div>
  );
}
