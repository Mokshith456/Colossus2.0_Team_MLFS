import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            width: "100vw",
            margin: 0,
            padding: 0,
            background: "linear-gradient(135deg, #f0f4ff 0%, #e6eeff 50%, #f0f4ff 100%)",
            position: "relative",
            overflow: "hidden",
            boxSizing: "border-box"
        }}>
            {/* Animated Background Shapes */}
            <div style={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                background: `
                    radial-gradient(circle at 20% 20%, rgba(147, 197, 253, 0.15) 0%, transparent 50%),
                    radial-gradient(circle at 80% 80%, rgba(167, 243, 208, 0.15) 0%, transparent 50%),
                    radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)
                `,
                zIndex: "1"
            }} />

            {/* Content Container */}
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "4rem",
                position: "relative",
                zIndex: "2",
                width: "100%",
                maxWidth: "1200px",
                padding: "2rem",
                boxSizing: "border-box"
            }}>
                {/* Doctor Side Box */}
                <div
                    onClick={() => navigate("/doctor")}
                    style={{
                        width: "320px",
                        padding: "3rem 2.5rem",
                        textAlign: "center",
                        cursor: "pointer",
                        borderRadius: "24px",
                        background: "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)",
                        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        transform: "translateY(0)",
                        border: "1px solid rgba(255, 255, 255, 0.5)"
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-12px)";
                        e.currentTarget.style.boxShadow = "0 20px 35px rgba(0, 0, 0, 0.15)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.1)";
                    }}
                >
                    <h2 style={{
                        fontSize: "32px",
                        color: "#166534",
                        marginBottom: "1.5rem",
                        fontWeight: "700",
                        letterSpacing: "-0.5px"
                    }}>Doctor Side</h2>
                    <p style={{
                        color: "#15803d",
                        fontSize: "18px",
                        opacity: "0.9",
                        fontWeight: "500"
                    }}>Go to Upload Reports</p>
                </div>

                {/* Dividing Line */}
                <div style={{
                    height: "320px",
                    width: "2px",
                    background: "linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.12), transparent)",
                    position: "relative"
                }}>
                    <div style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        background: "white",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "20px",
                        color: "#4b5563",
                        fontWeight: "600"
                    }}>
                        or
                    </div>
                </div>

                {/* Patient Side Box */}
                <div
                    onClick={() => navigate("/patient/login")}
                    style={{
                        width: "320px",
                        padding: "3rem 2.5rem",
                        textAlign: "center",
                        cursor: "pointer",
                        borderRadius: "24px",
                        background: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
                        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        transform: "translateY(0)",
                        border: "1px solid rgba(255, 255, 255, 0.5)"
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-12px)";
                        e.currentTarget.style.boxShadow = "0 20px 35px rgba(0, 0, 0, 0.15)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.1)";
                    }}
                >
                    <h2 style={{
                        fontSize: "32px",
                        color: "#1e40af",
                        marginBottom: "1.5rem",
                        fontWeight: "700",
                        letterSpacing: "-0.5px"
                    }}>Patient Side</h2>
                    <p style={{
                        color: "#1e3a8a",
                        fontSize: "18px",
                        opacity: "0.9",
                        fontWeight: "500"
                    }}>Login</p>
                </div>
            </div>
        </div>
    );
}
