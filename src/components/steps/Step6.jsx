import { Plane, Home, Baby, Globe, Camera } from "lucide-react";

export default function Step6({ form, update, next, back }) {
    const options = [
        { label: "Traveling the world", icon: <Plane size={18} /> },
        { label: "Building a home", icon: <Home size={18} /> },
        { label: "Starting a family", icon: <Baby size={18} /> },
        { label: "Big adventures", icon: <Globe size={18} /> },
        { label: "Creating memories", icon: <Camera size={18} /> },
    ];

    return (
        <div className="fade-in-up">
            <h2 className="main-title">What is your dream together?</h2>

            <div className="option-grid">
                {options.map((opt) => (
                    <div
                        key={opt.label}
                        className={`option-chip ${form.future === opt.label ? "active" : ""}`}
                        onClick={() => update("future", opt.label)}
                    >
                        {opt.icon}
                        {opt.label}
                    </div>
                ))}
            </div>

            <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "32px" }}>
                <button className="nav-btn" onClick={back}>Back</button>
                <button
                    className="glow-btn"
                    onClick={next}
                    disabled={!form.future}
                >
                    Continue
                </button>
            </div>
        </div>
    );
}
