import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Pages
import HomePage from "./components/HomePage";
import DoctorAuth from "./components/doctor/DoctorAuth";
import PatientAuth from "./components/patient/PatientAuth";

// Doctor pages
import UploadReport from "./components/Doctor/UploadReport";
import ScheduleMeeting from "./components/doctor/ScheduleMeeting";
import RegisterPatient from "./components/doctor/RegisterPatient";

// Patient pages
import PatientDashboard from "./components/patient/PatientDashboard";
import SelfAssessment from "./components/patient/SelfAssessment";
import ViewPlan from "./components/patient/ViewPlan";

// Doctor Dashboard
function DoctorDashboard() {
  return (
    <div style={{ padding: "1rem" }}>
      <h1>Doctor Dashboard</h1>
      <nav style={{ marginBottom: "1rem" }}>
        <Link to="/doctor/upload" style={{ marginRight: "1rem" }}>Upload Report</Link>
        <Link to="/doctor/schedule" style={{ marginRight: "1rem" }}>Schedule Meeting</Link>
        <Link to="/doctor/register">Register Patient</Link>
      </nav>
      <Routes>
        <Route path="upload" element={<UploadReport />} />
        <Route path="schedule" element={<ScheduleMeeting />} />
        <Route path="register" element={<RegisterPatient />} />
      </Routes>
    </div>
  );
}

// Main App Router
function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<HomePage />} />

        {/* Doctor Auth and Dashboard */}
        <Route path="/doctor" element={<DoctorAuth />} />
        <Route path="/doctor/*" element={<DoctorDashboard />} />

        {/* Patient Auth and Dashboard */}
        <Route path="/patient/login" element={<PatientAuth />} />
        <Route path="/patient/dashboard" element={<PatientDashboard />} />
        <Route path="/patient/self-assessment" element={<SelfAssessment />} />
        <Route path="/patient/view-plan" element={<ViewPlan fetchFromDatabase={true} />} />
      </Routes>
    </Router>
  );
}

export default App;
