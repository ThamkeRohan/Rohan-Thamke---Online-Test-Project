import { Link, Links, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import DoctorSignup from "./pages/DoctorSignup";
import PatientSignup from "./pages/PatientSignup";
import { useAuth, useAuthUpdate } from "./contexts/AuthContext";
import DoctorProfile from "./pages/DoctorProfile";
import DoctorConsultations from "./pages/DoctorConsultations";
import AllDoctors from "./pages/AllDoctors";
import CreateConsultation from "./pages/CreateConsultation";
import PatientConsultations from "./pages/PatientConsultations";
import EditPrescription from "./pages/EditPrescription";
import CreatePrescription from "./pages/CreatePrescription";
import ViewPrescription from "./pages/ViewPrescription";
import Home from "./pages/Home";

function App() {
  const auth = useAuth()
  const {logout} = useAuthUpdate()
  return (
    <div>
      <nav className="nav-bar">
        <ul>
          {auth != null && (
            <button className="link" onClick={logout}>
              Logout
            </button>
          )}
          {auth == null ? (
            <>
              <li>
                <Link className="link" to="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link className="link" to="/signup/doctor">
                  Doctor Signup
                </Link>
              </li>
              <li>
                <Link className="link" to="/signup/patient">
                  Patient Signup
                </Link>
              </li>
            </>
          ) : auth.role === "doctor" ? (
            <>
              <li>
                <Link className="link" to={`/doctorProfile/${auth.user._id}`}>
                  Doctor Profile
                </Link>
              </li>
              <li>
                <Link
                  className="link"
                  to={`/doctorConsultations/${auth.user._id}`}
                >
                  Doctor Prescriptions
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  className="link"
                  to={`/patientConsultations/${auth.user._id}`}
                >
                  Patient Consultations
                </Link>
              </li>
              <li>
                <Link className="link" to={`/doctors`}>
                  All Doctors
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <Routes>
        <Route path="/signup/doctor" element={<DoctorSignup />} />
        <Route path="/signup/patient" element={<PatientSignup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/doctorProfile/:doctorId"
          element={auth == null ? <Navigate to="/login" /> : <DoctorProfile />}
        />
        <Route
          path="/doctorConsultations/:doctorId"
          element={
            auth == null ? <Navigate to="/login" /> : <DoctorConsultations />
          }
        />
        <Route path="/" element={<Home />} />
        <Route
          path="/createConsultation/:doctorId"
          element={
            auth == null ? <Navigate to="/login" /> : <CreateConsultation />
          }
        />
        <Route
          path="/patientConsultations/:patientId"
          element={
            auth == null ? <Navigate to="/login" /> : <PatientConsultations />
          }
        />
        <Route
          path="/doctorConsultatons/:doctorId"
          element={
            auth == null ? <Navigate to="/login" /> : <DoctorConsultations />
          }
        />
        <Route
          path="/createPrescription/:consultationId"
          element={
            auth == null ? <Navigate to="/login" /> : <CreatePrescription />
          }
        />
        <Route
          path="/editPrescription/:prescriptionId"
          element={
            auth == null ? <Navigate to="/login" /> : <EditPrescription />
          }
        />
        <Route
          path="/viewPrescription/:prescriptionId"
          element={
            auth == null ? <Navigate to="/login" /> : <ViewPrescription />
          }
        />
        <Route
          path="/doctors"
          element={auth == null ? <Navigate to="/login" /> : <AllDoctors />}
        />
      </Routes>
    </div>
  );
}

export default App
