// frontend/src/components/Doctor/UploadReport.js
import { useState } from "react";
import axios from "../../services/api";

export default function UploadReport() {
    const [file, setFile] = useState(null);
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async () => {
        if (!file || !email) {
            alert("Please enter a patient email and select a report file.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("email", email);

        try {
            const res = await axios.post("/upload-report", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            setMessage(res.data.message);
            setEmail("");
            setFile(null);
        } catch (err) {
            console.error("Upload failed:", err);
            alert("Failed to upload the report. Please try again.");
        }
    };

    return (
        <div style={{ padding: "1rem", maxWidth: "500px" }}>
            <h2>Upload Patient Report</h2>

            <input
                type="email"
                placeholder="Patient Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
            />

            <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
            />

            <button
                onClick={handleSubmit}
                style={{
                    padding: "10px 15px",
                    backgroundColor: "#007BFF",
                    color: "white",
                    border: "none",
                    cursor: "pointer"
                }}
            >
                Upload Report
            </button>

            {message && <p style={{ marginTop: "10px", color: "green" }}>{message}</p>}
        </div>
    );
}
