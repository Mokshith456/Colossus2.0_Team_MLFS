# File: main.py
from agents.coordinator import MultiDisorderCoordinator

def main():
    coordinator = MultiDisorderCoordinator()
    
    # Prompt user for disorder type
    disorder_type = input("Enter the type of disorder (articulation, fluency, voice, language, motor_speech): ").strip().lower()
    
    # Gather patient profile details
    age = input("Enter patient's age: ")
    severity = input("Enter severity (mild, moderate, severe): ")
    goals = input("Enter therapy goals (comma-separated): ").split(',')
    history = input("Enter therapy history: ")
    
    # Create patient profile dictionary
    patient_profile = {
        "age": age,
        "disorder_type": disorder_type,
        "severity": severity,
        "goals": goals,
        "history": history
    }
    
    # Generate and print the therapy plan
    try:
        plan = coordinator.get_weekly_plan(disorder_type, patient_profile)
        print("\n=== Personalized Exercise Plan ===")
        print(plan)
    except KeyError:
        print(f"Error: Unknown disorder type '{disorder_type}'. Please enter a valid disorder type.")

if __name__ == "__main__":
    main()
