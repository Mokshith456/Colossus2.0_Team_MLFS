import { Link } from "react-router-dom";


export default function PatientDashboard() {
    return (
        <div style={{ padding: "2rem" }}>
            <h1>Welcome to Patient Dashboard</h1>
            <div style={{ marginTop: "2rem" }}>
                {/* Navigation Buttons */}
                <Link to="/patient/self-assessment">
                    <button style={{ padding: "10px 20px", fontSize: "16px" }}>
                        Self Assessment
                    </button>
                </Link>
                <Link to="/patient/view-plan">
                    <button style={{ marginTop: "1rem" }}>View Therapy Plan</button>
                </Link>
            </div>
        </div>
    );
}
