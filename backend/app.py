import sys
import os
import traceback
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

# Add root directory to sys.path so 'agents' can be imported
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from agents.coordinator import MultiDisorderCoordinator

# ─────────────────────────────────────────
app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["http://localhost:5173"])

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
os.makedirs(os.path.join(BASE_DIR, "instance"), exist_ok=True)

db_path = os.path.join(BASE_DIR, "instance", "patients.db")
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{db_path}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# ─────────────────────────────────────────
# Models
# ─────────────────────────────────────────
class Patient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    age = db.Column(db.String(10))
    severity = db.Column(db.String(20))
    goals = db.Column(db.Text)
    history = db.Column(db.Text)
    disorder_type = db.Column(db.String(50))  


class Doctor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)

with app.app_context():
    db.create_all()

# ─────────────────────────────────────────
# In-memory stores
# ─────────────────────────────────────────
reports, feedbacks, meetings = [], [], []

@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Headers"] = "Content-Type,Authorization"
    response.headers["Access-Control-Allow-Methods"] = "GET,POST,PUT,DELETE,OPTIONS"
    return response

# ─────────────────────────────────────────
# Routes
# ─────────────────────────────────────────

@app.route("/upload-report", methods=["POST"])
def upload_report():
    file = request.files["file"]
    email = request.form["email"]
    os.makedirs("reports", exist_ok=True)
    path = f"reports/{email}_{file.filename}"
    file.save(path)
    reports.append({"email": email, "path": path})
    return jsonify({"message": "Report uploaded"})

@app.route("/get-feedbacks", methods=["GET"])
def get_feedbacks():
    return jsonify(feedbacks)

@app.route("/submit-feedback", methods=["POST"])
def submit_feedback():
    data = request.json
    feedbacks.append({"email": data["email"], "message": data["message"]})
    return jsonify({"message": "Feedback received"})

@app.route("/schedule-meeting", methods=["POST"])
def schedule_meeting():
    data = request.json
    link = "https://bookings.orufy.com/"
    meetings.append({"email": data["email"], "datetime": data["datetime"], "link": link})
    return jsonify({"link": link})

@app.route("/register-patient", methods=["POST"])
def register_patient():
    data = request.json
    username = data["username"].strip()
    email = data["email"].strip()
    password = data["password"].strip()
    age = data.get("age", "").strip()
    severity = data.get("severity", "").strip()
    goals = ",".join(data.get("goals", []))
    history = data.get("history", "").strip()

    if Patient.query.filter_by(username=username).first():
        return jsonify({"error": "Username already exists"}), 400
    if Patient.query.filter_by(email=email).first():
        return jsonify({"error": "Email already exists"}), 400

    new_patient = Patient(
        username=username,
        password=password,
        email=email,
        age=age,
        severity=severity,
        goals=goals,
        history=history
    )
    db.session.add(new_patient)
    db.session.commit()
    return jsonify({"message": "Patient created successfully"})

@app.route("/login-patient", methods=["POST"])
def login_patient():
    data = request.json
    username = data["username"].strip()
    password = data["password"].strip()
    patient = Patient.query.filter_by(username=username).first()
    if patient and patient.password == password:
        return jsonify({
    "message": "Login successful",
    "username": patient.username,   # ✅ Add this line
    "email": patient.email,
    "age": patient.age,
    "severity": patient.severity,
    "goals": patient.goals,
    "history": patient.history
})

    return jsonify({"error": "Invalid credentials"}), 401

@app.route("/register-doctor", methods=["POST"])
def register_doctor():
    data = request.json
    username = data["username"].strip()
    password = data["password"].strip()
    if Doctor.query.filter_by(username=username).first():
        return jsonify({"error": "Username already exists"}), 400
    new_doctor = Doctor(username=username, password=password)
    db.session.add(new_doctor)
    db.session.commit()
    return jsonify({"message": "Doctor registered successfully"})

@app.route("/login-doctor", methods=["POST"])
def login_doctor():
    data = request.json
    username = data["username"].strip()
    password = data["password"].strip()
    doctor = Doctor.query.filter_by(username=username).first()
    if doctor and doctor.password == password:
        return jsonify({"message": "Login successful"})
    return jsonify({"error": "Invalid credentials"}), 401

@app.route("/generate-plan", methods=["POST"])
def generate_plan():
    data = request.json
    username = data.get("username")
    disorder_type = data.get("disorder_type", "").strip().lower()

    if not username or not disorder_type:
        return jsonify({"error": "Username and disorder_type are required"}), 400

    patient = Patient.query.filter_by(username=username).first()
    if not patient:
        return jsonify({"error": "Patient not found"}), 404

    profile = {
        "age": patient.age,
        "disorder_type": disorder_type,
        "severity": patient.severity,
        "goals": patient.goals.split(",") if patient.goals else [],
        "history": patient.history
    }

    try:
        coordinator = MultiDisorderCoordinator()
        plan = coordinator.get_weekly_plan(disorder_type, profile)
        return jsonify({"plan": plan})
    except Exception as e:
        print("ERROR:", str(e))
        traceback.print_exc()  # <-- ✅ Add this to show full backend error
        return jsonify({"error": str(e)}), 500


# ─────────────────────────────────────────
# Entry Point
# ─────────────────────────────────────────
if __name__ == "__main__":
    app.run(debug=True)
