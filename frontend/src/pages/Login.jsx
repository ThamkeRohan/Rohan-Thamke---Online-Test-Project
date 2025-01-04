import React, { useState } from "react";
import { useAuthUpdate } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "doctor", 
  });
  const [isLoading, setIsLoading] = useState(false)

  const { login: loginLocally } = useAuthUpdate();
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        setIsLoading(true)
        const res = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json()
        if(res.ok) {
            loginLocally(data)
            navigate(
              `/${
                data.role === "doctor"
                  ? "doctorProfile"
                  : "patientConsultations"
              }/${data.user._id}`
            );
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
        <h1 className="page-title">Login</h1>
      <form onSubmit={handleSubmit} className="form">
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
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <br />
        <select className="field" name="role" onChange={handleChange}>
          <option value="doctor">Doctor</option>
          <option value="patient">Patient</option>
        </select>
        <br />
        <button type="submit" className="submit-btn">{isLoading ? "Loading..." : "Login"}</button>
      </form>
    </div>
  );
};

export default Login;
