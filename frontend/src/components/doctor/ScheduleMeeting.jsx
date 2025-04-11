// frontend/src/components/Doctor/ScheduleMeeting.js
import { useState } from "react";
import axios from "../../services/api";

export default function ScheduleMeeting() {
    const [email, setEmail] = useState("");
    const [datetime, setDatetime] = useState("");
    const [link, setLink] = useState("");

    const handleSchedule = async () => {
        try {
            const res = await axios.post("/schedule-meeting", { email, datetime });
            setLink(res.data.link);
        } catch (error) {
            alert("Failed to schedule meeting. Please try again.");
        }
    };

    return (
        <div style={{ padding: "1rem", maxWidth: "500px" }}>
            <h2>Schedule Therapy via Orfi</h2>
            <input
                type="email"
                placeholder="Patient Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
            />
            <input
                type="datetime-local"
                value={datetime}
                onChange={(e) => setDatetime(e.target.value)}
                style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
            />
            <button
                onClick={handleSchedule}
                style={{
                    padding: "10px 15px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    cursor: "pointer"
                }}
            >
                Generate Orfi Booking Link
            </button>

            {link && (
                <div style={{ marginTop: "20px" }}>
                    <p>Send this booking link to the patient:</p>
                    <a href={link} target="_blank" rel="noopener noreferrer">
                        {link}
                    </a>
                </div>
            )}
        </div>
    );
}
