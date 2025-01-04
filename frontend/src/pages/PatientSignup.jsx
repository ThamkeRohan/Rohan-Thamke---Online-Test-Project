import React, { useState } from "react";
import { useAuthUpdate } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const PatientSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    profilePicture: null,
    age: "",
    email: "",
    phone: "",
    historyOfSurgery: "",
    historyOfIllness: "",
    password: "",
  });
  const { login: loginLocally } = useAuthUpdate();
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImgUpload = (e) => {
    const imageData = new FormData();
    imageData.append("file", e.target.files[0]);
    imageData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);

    fetch(`https://api.cloudinary.com/v1_1/dzmwluabx/image/upload`, {
      method: "POST",
      body: imageData,
    })
      .then((res) => res.json())
      .then((data) =>
        setFormData((prev) => ({ ...prev, profilePicture: data.secure_url }))
      );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_BASE_URL}/api/auth/patients/signup`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...formData,
              age: Number(formData.age),
              phone: Number(formData.phone),
            }),
          }
        );
        const data = await res.json()
        if(res.ok) {
            loginLocally(data)
            navigate(`/patientConsultations/${data.user._id}`);
        }
        else {
            alert(data.message)
        }
    } catch (err) {
        alert(err.message)
    }
    
    fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/api/auth/patients/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        age: Number(formData.age),
        phone: Number(formData.phone),
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div>
      <h1 className="page-title">Patient Signup</h1>
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
          type="number"
          name="age"
          placeholder="Age"
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
          type="text"
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          required
        />
        <br />
        <textarea
          className="field"
          name="historyOfSurgery"
          placeholder="History of Surgery"
          onChange={handleChange}
        />
        <br />
        <textarea
          className="field"
          name="historyOfIllness"
          placeholder="History of Illness"
          onChange={handleChange}
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
        <button className="submit-btn" type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default PatientSignup;
