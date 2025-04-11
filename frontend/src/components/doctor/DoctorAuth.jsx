import { useState } from "react";
import axios from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function DoctorAuth() {
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({ username: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const endpoint = isLogin ? "/login-doctor" : "/register-doctor";
            const res = await axios.post(endpoint, form);
            alert(res.data.message);
            if (isLogin) {
                localStorage.setItem("doctor", form.username);
                navigate("/doctor/upload");
            } else {
                setIsLogin(true);
            }
        } catch (err) {
            alert(err.response?.data?.error || "Something went wrong");
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "5rem auto", textAlign: "center" }}>
            <h2>{isLogin ? "Doctor Login" : "Doctor Signup"}</h2>
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
            <button onClick={handleSubmit} style={{ padding: "10px 20px" }}>
                {isLogin ? "Login" : "Signup"}
            </button>
            <p style={{ marginTop: "1rem" }}>
                {isLogin ? "Don't have an account?" : "Already registered?"}{" "}
                <span
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={() => setIsLogin(!isLogin)}
                >
                    {isLogin ? "Signup" : "Login"}
                </span>
            </p>
        </div>
    );
}
