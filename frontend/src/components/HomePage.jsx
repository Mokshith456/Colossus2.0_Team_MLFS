import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            gap: "4rem"
        }}>

            {/* Doctor Side Box */}
            <div
                onClick={() => navigate("/doctor")} // ✅ updated route
                style={{
                    border: "2px solid #4CAF50",
                    padding: "3rem 4rem",
                    textAlign: "center",
                    cursor: "pointer",
                    borderRadius: "10px",
                    background: "#e8f5e9",
                    transition: "0.2s ease-in-out"
                }}
            >
                <h2>Doctor Side</h2>
                <p>Go to Upload Reports</p>
            </div>

            {/* Patient Side Box */}
            <div
                onClick={() => navigate("/patient/login")}
                style={{
                    border: "2px solid #2196F3",
                    padding: "3rem 4rem",
                    textAlign: "center",
                    cursor: "pointer",
                    borderRadius: "10px",
                    background: "#e3f2fd",
                    transition: "0.2s ease-in-out"
                }}
            >
                <h2>Patient Side</h2>
                <p>Login</p>
            </div>
        </div>
    );
}
