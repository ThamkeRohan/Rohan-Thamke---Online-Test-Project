import React, { useState } from "react";
import { useAuthUpdate } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const DoctorSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    specialty: "",
    email: "",
    phone: "",
    yearsOfExperience: "",
    password: "",
    profilePicture: null,
  });
  const [isLoading, setIsLoading] = useState(false)
  const { login: loginLocally } = useAuthUpdate();
  const navigate = useNavigate()
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImgUpload = (e) => {
    const imageData = new FormData();
    imageData.append("file", e.target.files[0]);
    imageData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);

    fetch(`https://api.cloudinary.com/v1_1/dzmwluabx/image/upload`, {
      method: "POST",
      body: imageData
    })
    .then(res => res.json())
    .then(data => setFormData(prev => ({...prev, profilePicture: data.secure_url})))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true)
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/auth/doctors/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            phone: Number(formData.phone),
            yearsOfExperience: Number(formData.yearsOfExperience),
          }),
        }
      );
      const data = await res.json()
      if(res.ok) {
        loginLocally(data)
        navigate(`/doctorProfile/${data.user._id}`)
      }
      else {
        alert(data.message)
      }
    } catch (err) {
      alert(err.message)
    }
    finally {
      setIsLoading(false)
    }
  };

  return (
    <div>
      <h1 className="page-title">Doctor Signup</h1>
      <form onSubmit={handleSubmit} className="form">
        {formData.profilePicture?.length > 0 && (
          <img className="profile-img" src={formData.profilePicture} />
        )}
        <br />
        <input
          className="field"
          type="file"
          name="profilePicture"
          onChange={handleImgUpload}
          required
        />
        <br />
        <input
          className="field"
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <br />
        <input
          className="field"
          type="text"
          name="specialty"
          placeholder="Specialty"
          onChange={handleChange}
          required
        />
        <br />
        <input
          className="field"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <br />
        <input
          className="field"
          type="number"
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          required
        />
        <br />
        <input
          className="field"
          type="number"
          step="0.1"
          name="yearsOfExperience"
          placeholder="Years of Experience"
          onChange={handleChange}
          required
        />
        <br />
        <input
          className="field"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <br />

        <button type="submit" className="submit-btn">{isLoading ? "Loading..." : "Signup"}</button>
      </form>
    </div>
  );
};

export default DoctorSignup;
