import React, { useEffect, useState } from "react";
import axios from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function ViewPlan() {
    const [disorder, setDisorder] = useState("articulation");
    const [plan, setPlan] = useState("");
    const [loading, setLoading] = useState(false);
    const [expandedWeeks, setExpandedWeeks] = useState({});
    const [completedWeeks, setCompletedWeeks] = useState({});
    const [showAssessment, setShowAssessment] = useState(false);
    const [isAssessmentExpanded, setIsAssessmentExpanded] = useState(false);
    const [isReferencesExpanded, setIsReferencesExpanded] = useState(false);
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
            setExpandedWeeks({});
            const initialCompletedState = {
                1: false,
                2: false,
                3: false
            };
            setCompletedWeeks(initialCompletedState);
            setShowAssessment(false);
            setIsAssessmentExpanded(false);
            setIsReferencesExpanded(false);
        } catch (err) {
            alert("Failed to generate plan: " + (err.response?.data?.error || err.message));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleGeneratePlan();
    }, [disorder]);

    const handleComplete = (weekNumber) => {
        const newCompletedWeeks = {
            ...completedWeeks,
            [weekNumber]: !completedWeeks[weekNumber]
        };
        setCompletedWeeks(newCompletedWeeks);

        // If marking as complete, collapse the tile
        if (!completedWeeks[weekNumber]) {
            setExpandedWeeks(prev => ({
                ...prev,
                [weekNumber]: false
            }));
        }

        // Check if all weeks are completed
        const allWeeksCompleted = [1, 2, 3].every(week => newCompletedWeeks[week]);
        if (allWeeksCompleted) {
            setShowAssessment(true);
            setIsAssessmentExpanded(true);
        } else {
            setShowAssessment(false);
        }
    };

    const parseWeeklyPlans = (planText) => {
        if (!planText) return [];

        const weeks = [];
        const weekRegex = /Week (\d+):/g;
        let lastIndex = 0;
        let match;

        while ((match = weekRegex.exec(planText)) !== null) {
            const weekNumber = parseInt(match[1]);
            if (weekNumber <= 3) { // Only include weeks 1-3
                const startIndex = match.index;
                const nextWeekIndex = planText.indexOf("Week " + (weekNumber + 1) + ":", startIndex);
                const endIndex = nextWeekIndex !== -1 ? nextWeekIndex : planText.length;

                const weekContent = planText.substring(startIndex, endIndex).trim();
                weeks.push({
                    number: weekNumber,
                    content: weekContent
                });
            }
            lastIndex = match.index;
        }

        return weeks;
    };

    const formatContent = (content) => {
        const sections = content.split('\n').map(line => line.trim()).filter(line => line);

        return (
            <div className="plan-content" style={{ fontSize: '14px' }}>
                {sections.map((section, index) => {
                    // Week title
                    if (section.startsWith('Week')) {
                        return <h3 key={index} style={{
                            color: '#2c3e50',
                            marginBottom: '16px',
                            fontSize: '16px',
                            fontWeight: '600'
                        }}>{section.replace(/\*\*/g, '')}</h3>;
                    }

                    // Main sections (Weekly Goal, Therapy Focus, etc.)
                    if (section.includes('**') && !section.includes(':**')) {
                        const cleanedSection = section.replace(/\*\*/g, '');
                        if (cleanedSection.toLowerCase().includes('weekly goal')) {
                            return (
                                <div key={index} style={{ marginBottom: '12px' }}>
                                    <span style={{
                                        color: '#3182ce',
                                        fontSize: '15px',
                                        fontWeight: '600'
                                    }}>• Weekly Goal:</span>
                                    <p style={{
                                        margin: '4px 0 0 16px',
                                        color: '#4a5568',
                                        lineHeight: '1.4'
                                    }}>{cleanedSection.split(':')[1]?.trim()}</p>
                                </div>
                            );
                        }
                        return <div key={index} style={{
                            color: '#3182ce',
                            marginBottom: '8px',
                            fontSize: '15px',
                            fontWeight: '600'
                        }}>• {cleanedSection}</div>;
                    }

                    // Numbered items (like "1. Tactile Exploration")
                    if (/^\d+\./.test(section)) {
                        return (
                            <div key={index} style={{
                                marginLeft: '16px',
                                marginBottom: '12px',
                                color: '#3182ce',
                                fontSize: '15px',
                                fontWeight: '600'
                            }}>
                                {section.replace(/\*\*/g, '')}
                            </div>
                        );
                    }

                    // Subheadings with content
                    if (section.includes(':**')) {
                        const [heading, content] = section.split(':**').map(s => s.trim());
                        return (
                            <div key={index} style={{ marginBottom: '8px', marginLeft: '16px' }}>
                                <span style={{
                                    color: '#4a5568',
                                    fontWeight: '600',
                                    fontSize: '15px'
                                }}>
                                    {heading.replace(/\*\*/g, '')}:
                                </span>
                                <span style={{
                                    marginLeft: '4px',
                                    color: '#4a5568'
                                }}>{content}</span>
                            </div>
                        );
                    }

                    // Regular text
                    return (
                        <p key={index} style={{
                            marginLeft: '32px',
                            marginBottom: '8px',
                            color: '#4a5568',
                            lineHeight: '1.4'
                        }}>{section.replace(/\*\*/g, '')}</p>
                    );
                })}
            </div>
        );
    };

    const toggleWeek = (weekNumber) => {
        setExpandedWeeks(prev => ({
            ...prev,
            [weekNumber]: !prev[weekNumber]
        }));
    };

    const weeklyPlans = parseWeeklyPlans(plan);

    return (
        <div style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
            <h2 style={{
                color: '#2d3748',
                marginBottom: '24px',
                fontSize: '24px',
                fontWeight: '600'
            }}>Personalized Weekly Therapy Plan</h2>

            <div style={{ marginBottom: "24px" }}>
                <label style={{ fontWeight: 500, color: '#4a5568' }}>Select Disorder Type: </label>
                <select
                    value={disorder}
                    onChange={(e) => setDisorder(e.target.value)}
                    style={{
                        marginLeft: "12px",
                        padding: "6px 12px",
                        borderRadius: "4px",
                        border: "1px solid #e2e8f0",
                        fontSize: "14px",
                        color: '#4a5568'
                    }}
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
            ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {weeklyPlans.map((week) => (
                        <div
                            key={week.number}
                            style={{
                                border: "1px solid #e2e8f0",
                                borderRadius: "8px",
                                overflow: "hidden",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                                backgroundColor: completedWeeks[week.number] ? "#f0fff4" : "#f8fafc"
                            }}
                        >
                            <div
                                onClick={() => toggleWeek(week.number)}
                                style={{
                                    padding: "12px 16px",
                                    backgroundColor: completedWeeks[week.number] ? "#c6f6d5" : "#f8fafc",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    cursor: "pointer",
                                    borderBottom: expandedWeeks[week.number] ? "1px solid #e2e8f0" : "none",
                                    transition: "background-color 0.3s ease"
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <h3 style={{
                                        margin: 0,
                                        color: completedWeeks[week.number] ? '#2f855a' : '#2d3748',
                                        fontSize: '16px',
                                        fontWeight: 600
                                    }}>Week {week.number}</h3>
                                    <span style={{
                                        color: completedWeeks[week.number] ? '#2f855a' : '#4a5568',
                                        fontSize: '16px'
                                    }}>- {week.content.split('\n')[0].split(':**')[0].replace(/\*\*/g, '').split(':')[1]?.trim()}</span>
                                </div>
                                <span style={{
                                    color: completedWeeks[week.number] ? '#2f855a' : '#4a5568',
                                    fontSize: '14px'
                                }}>{expandedWeeks[week.number] ? "▼" : "▶"}</span>
                            </div>
                            {expandedWeeks[week.number] && (
                                <div style={{
                                    padding: "16px",
                                    backgroundColor: "white",
                                    display: "flex",
                                    flexDirection: "column"
                                }}>
                                    {formatContent(week.content)}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleComplete(week.number);
                                        }}
                                        style={{
                                            alignSelf: "flex-end",
                                            marginTop: "16px",
                                            padding: "8px 16px",
                                            backgroundColor: completedWeeks[week.number] ? "#48bb78" : "#3182ce",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "4px",
                                            cursor: "pointer",
                                            fontSize: "14px",
                                            fontWeight: 500,
                                            transition: "background-color 0.2s"
                                        }}
                                    >
                                        {completedWeeks[week.number] ? "Completed ✓" : "Mark as Complete"}
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* References Tile */}
                    <div
                        style={{
                            border: "1px solid #e2e8f0",
                            borderRadius: "8px",
                            overflow: "hidden",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                            backgroundColor: "#f8fafc",
                            marginTop: "16px"
                        }}
                    >
                        <div
                            onClick={() => setIsReferencesExpanded(!isReferencesExpanded)}
                            style={{
                                padding: "12px 16px",
                                backgroundColor: "#f0f9ff",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                cursor: "pointer",
                                borderBottom: isReferencesExpanded ? "1px solid #e2e8f0" : "none",
                                transition: "background-color 0.3s ease"
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <h3 style={{
                                    margin: 0,
                                    color: '#2b6cb0',
                                    fontSize: '16px',
                                    fontWeight: 600
                                }}>References</h3>
                                <span style={{
                                    color: '#4a5568',
                                    fontSize: '16px'
                                }}>- Supporting Literature</span>
                            </div>
                            <span style={{
                                color: '#4a5568',
                                fontSize: '14px'
                            }}>{isReferencesExpanded ? "▼" : "▶"}</span>
                        </div>
                        {isReferencesExpanded && (
                            <div style={{
                                padding: "16px",
                                backgroundColor: "white"
                            }}>
                                <div style={{ fontSize: '14px', color: '#4a5568' }}>
                                    <p style={{ marginBottom: '12px' }}>
                                        [1] American Speech-Language-Hearing Association. (2016). Scope of practice in speech-language pathology.
                                    </p>
                                    <p style={{ marginBottom: '12px' }}>
                                        [2] Guitar, B. (2013). Stuttering: An integrated approach to its nature and treatment.
                                    </p>
                                    <p style={{ marginBottom: '12px' }}>
                                        [3] Yorkston, K. M., Beukelman, D. R., Strand, E. A., & Bell, K. R. (2010). Management of motor speech disorders in children and adults.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {showAssessment && (
                        <div
                            style={{
                                border: "1px solid #e2e8f0",
                                borderRadius: "8px",
                                overflow: "hidden",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                                backgroundColor: "#f8fafc",
                                marginTop: "16px"
                            }}
                        >
                            <div
                                onClick={() => setIsAssessmentExpanded(!isAssessmentExpanded)}
                                style={{
                                    padding: "12px 16px",
                                    backgroundColor: "#f0f9ff",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    cursor: "pointer",
                                    borderBottom: isAssessmentExpanded ? "1px solid #e2e8f0" : "none",
                                    transition: "background-color 0.3s ease"
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <h3 style={{
                                        margin: 0,
                                        color: '#2b6cb0',
                                        fontSize: '16px',
                                        fontWeight: 600
                                    }}>Final Assessment</h3>
                                    <span style={{
                                        color: '#4a5568',
                                        fontSize: '16px'
                                    }}>- Evaluate Your Progress</span>
                                </div>
                                <span style={{
                                    color: '#4a5568',
                                    fontSize: '14px'
                                }}>{isAssessmentExpanded ? "▼" : "▶"}</span>
                            </div>
                            {isAssessmentExpanded && (
                                <div style={{
                                    padding: "16px",
                                    backgroundColor: "white",
                                    display: "flex",
                                    flexDirection: "column"
                                }}>
                                    <div style={{ fontSize: '14px', color: '#4a5568' }}>
                                        <p style={{
                                            fontSize: '15px',
                                            fontWeight: '600',
                                            color: '#2b6cb0',
                                            marginBottom: '12px'
                                        }}>
                                            Congratulations on completing all weeks of your therapy plan!
                                        </p>
                                        <p style={{ marginBottom: '8px' }}>
                                            The assessment section will be updated with specific evaluation tasks and measurements.
                                        </p>
                                        {/* Placeholder for assessment content - to be updated later */}
                                        <div style={{
                                            padding: '12px',
                                            backgroundColor: '#f7fafc',
                                            borderRadius: '4px',
                                            marginTop: '12px'
                                        }}>
                                            <p style={{ fontStyle: 'italic', color: '#718096' }}>
                                                Assessment content will be provided soon...
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            <button
                onClick={() => navigate("/patient/dashboard")}
                style={{
                    marginTop: "24px",
                    padding: "8px 16px",
                    backgroundColor: "#3182ce",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: 500,
                    transition: "background-color 0.2s"
                }}
            >
                Back to Dashboard
            </button>
        </div>
    );
}
