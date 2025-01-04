import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


const DoctorProfile = () => {
  const [doctor, setDoctor] = useState(null);
  const {doctorId} = useParams()
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_BASE_URL}/api/doctors/${doctorId}`,
          {
            headers: {
              "Authorization": `Bearer ${JSON.parse(
                localStorage.getItem("USER_AUTH")
              ).token}`,
            },
          }
        );
        const data = await res.json()
        if(res.ok) {
            setDoctor(data);
            console.log(data)
        }
        else {
            alert(data.message)
        }
        
      } catch (error) {
        alert("Error fetching profile: " + error.message);
      }
    };
    fetchDoctor();
  }, []);

  if (!doctor) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="page-title">Doctor Profile</h1>
      <div className="doctor-profile">
        <div className="profile-img-container">
          <img src={doctor.profilePicture} alt="Profile" />
        </div>

        <p>
          <strong>Name:</strong> {doctor.name}
        </p>
        <p>
          <strong>Specialty:</strong> {doctor.specialty}
        </p>
        <p>
          <strong>Email:</strong> {doctor.email}
        </p>
        <p>
          <strong>Phone:</strong> {doctor.phone}
        </p>
        <p>
          <strong>Years of Experience:</strong> {doctor.yearsOfExperience}
        </p>
        <button className="btn" onClick={() => navigate(`/doctorConsultations/${doctorId}`)}>
          Go to Prescription Page
        </button>
      </div>
    </div>
  );
};

export default DoctorProfile;
