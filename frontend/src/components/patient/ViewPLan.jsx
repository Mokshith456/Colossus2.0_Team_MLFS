import React, { useEffect, useState } from "react";
import axios from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function ViewPlan() {
    const [disorder, setDisorder] = useState("articulation");
    const [plan, setPlan] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleGeneratePlan = async () => {
        const username = localStorage.getItem("patient");
        if (!username) {
            alert("You must be logged in as a patient.");
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post("/generate-plan", {
                username,
                disorder_type: disorder
            });
            setPlan(res.data.plan);
        } catch (err) {
            alert("Failed to generate plan: " + (err.response?.data?.error || err.message));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleGeneratePlan(); // Auto-generate plan on page load
    }, [disorder]);

    return (
        <div style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
            <h2>Personalized Weekly Therapy Plan</h2>

            <div style={{ marginBottom: "1rem" }}>
                <label>Select Disorder Type: </label>
                <select
                    value={disorder}
                    onChange={(e) => setDisorder(e.target.value)}
                    style={{ marginLeft: "1rem", padding: "5px" }}
                >
                    <option value="articulation">Articulation</option>
                    <option value="fluency">Fluency</option>
                    <option value="voice">Voice</option>
                    <option value="language">Language</option>
                    <option value="motor_speech">Motor Speech</option>
                </select>
            </div>

            {loading ? (
                <p>Generating plan...</p>
            ) : plan ? (
                <div style={{ background: "#f4f4f4", padding: "1rem", borderRadius: "8px" }}>
                    <h3>Plan for {disorder} Disorder:</h3>
                    <pre style={{ whiteSpace: "pre-wrap" }}>{plan}</pre>
                </div>
            ) : (
                <p>No plan available yet.</p>
            )}

            <button onClick={() => navigate("/patient/dashboard")} style={{ marginTop: "1.5rem" }}>
                Back to Dashboard
            </button>
        </div>
    );
}
