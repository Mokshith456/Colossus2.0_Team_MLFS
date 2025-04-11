import { useState } from "react";
import axios from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function PatientAuth() {
    const [form, setForm] = useState({ username: "", password: "" });
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post("/login-patient", form);
            alert(res.data.message);

            // ✅ Store username (not email) in localStorage for therapy plan generation
            localStorage.setItem("patient", res.data.username);

            navigate("/patient/dashboard");
        } catch (err) {
            alert(err.response?.data?.error || "Login failed. Please try again.");
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "5rem auto", textAlign: "center" }}>
            <h2>Patient Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                style={{ width: "100%", marginBottom: "1rem", padding: "10px" }}
            />
            <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                style={{ width: "100%", marginBottom: "1rem", padding: "10px" }}
            />
            <button onClick={handleLogin} style={{ padding: "10px 20px" }}>
                Login
            </button>
        </div>
    );
}
