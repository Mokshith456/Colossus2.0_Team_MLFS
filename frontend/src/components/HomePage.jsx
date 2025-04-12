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
            background: "linear-gradient(135deg, #f6f8fc 0%, #e9f0f7 100%)",
            position: "relative",
            overflow: "hidden"
        }}>
            {/* Background Shapes */}
            <div style={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                background: "radial-gradient(circle at 20% 20%, rgba(98, 0, 238, 0.03) 0%, transparent 40%), radial-gradient(circle at 80% 80%, rgba(0, 145, 255, 0.03) 0%, transparent 40%)",
                zIndex: "1"
            }} />

            {/* Content Container */}
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "4rem",
                position: "relative",
                zIndex: "2"
            }}>
                {/* Doctor Side Box */}
                <div
                    onClick={() => navigate("/doctor")}
                    style={{
                        width: "300px",
                        padding: "2.5rem",
                        textAlign: "center",
                        cursor: "pointer",
                        borderRadius: "20px",
                        background: "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)",
                        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
                        transition: "all 0.3s ease",
                        transform: "translateY(0)",
                        border: "1px solid rgba(255, 255, 255, 0.2)"
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-10px)";
                        e.currentTarget.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.15)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.1)";
                    }}
                >
                    <h2 style={{
                        fontSize: "28px",
                        color: "#2e7d32",
                        marginBottom: "1rem",
                        fontWeight: "600"
                    }}>Doctor Side</h2>
                    <p style={{
                        color: "#1b5e20",
                        fontSize: "16px",
                        opacity: "0.9"
                    }}>Go to Upload Reports</p>
                </div>

                {/* Dividing Line */}
                <div style={{
                    height: "300px",
                    width: "2px",
                    background: "linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.1), transparent)",
                    position: "relative"
                }}>
                    <div style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: "white",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "20px",
                        color: "#666"
                    }}>
                        or
                    </div>
                </div>

                {/* Patient Side Box */}
                <div
                    onClick={() => navigate("/patient/login")}
                    style={{
                        width: "300px",
                        padding: "2.5rem",
                        textAlign: "center",
                        cursor: "pointer",
                        borderRadius: "20px",
                        background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
                        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
                        transition: "all 0.3s ease",
                        transform: "translateY(0)",
                        border: "1px solid rgba(255, 255, 255, 0.2)"
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-10px)";
                        e.currentTarget.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.15)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.1)";
                    }}
                >
                    <h2 style={{
                        fontSize: "28px",
                        color: "#1565c0",
                        marginBottom: "1rem",
                        fontWeight: "600"
                    }}>Patient Side</h2>
                    <p style={{
                        color: "#0d47a1",
                        fontSize: "16px",
                        opacity: "0.9"
                    }}>Login</p>
                </div>
            </div>
        </div>
    );
}
