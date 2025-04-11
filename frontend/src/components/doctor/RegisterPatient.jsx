import { useState } from "react";
import axios from "../../services/api";

export default function RegisterPatient() {
    const [form, setForm] = useState({
        username: "",
        password: "",
        email: "",
        age: "",
        severity: "",
        goals: "",
        history: "",
        disorder_type: "articulation"  // ✅ Default selected value
    });

    const handleRegister = async () => {
        try {
            const payload = {
                ...form,
                goals: form.goals.split(",").map(g => g.trim())
            };
            const res = await axios.post("http://localhost:5000/register-patient", payload);
            alert(res.data.message);
            setForm({
                username: "",
                password: "",
                email: "",
                age: "",
                severity: "",
                goals: "",
                history: "",
                disorder_type: "articulation"
            });
        } catch (err) {
            alert(err.response?.data?.error || "Registration failed");
        }
    };

    return (
        <div style={{ padding: "1rem", maxWidth: "600px", margin: "auto" }}>
            <h2>Register Patient</h2>
            {["username", "password", "email", "age", "severity", "goals", "history"].map((field) => (
                <div key={field} style={{ marginBottom: "10px" }}>
                    <label>
                        {field.charAt(0).toUpperCase() + field.slice(1)}:
                        <input
                            type={field === "password" ? "password" : "text"}
                            placeholder={field === "goals" ? "Separate with commas" : ""}
                            value={form[field]}
                            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                            style={{ width: "100%", padding: "8px" }}
                        />
                    </label>
                </div>
            ))}

            {/* ✅ Speech Disorder Dropdown */}
            <div style={{ marginBottom: "10px" }}>
                <label>
                    Disorder Type:
                    <select
                        value={form.disorder_type}
                        onChange={(e) => setForm({ ...form, disorder_type: e.target.value })}
                        style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                    >
                        <option value="articulation">Articulation</option>
                        <option value="fluency">Fluency</option>
                        <option value="voice">Voice</option>
                        <option value="language">Language</option>
                        <option value="motor_speech">Motor Speech</option>
                    </select>
                </label>
            </div>

            <small>⚠️ Separate multiple goals using commas (e.g., improve clarity, increase fluency)</small>
            <br />
            <button style={{ marginTop: "1rem" }} onClick={handleRegister}>
                Create Patient Account
            </button>
        </div>
    );
}
