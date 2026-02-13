import { Sparkles, MessageCircle, HeartHandshake, PenTool } from "lucide-react";

export default function Step7({ form, update, back, next }) {
    const tones = [
        { label: "Romantic", icon: "🌹" },
        { label: "Playful", icon: "😉" },
        { label: "Deep", icon: "🌌" },
        { label: "Cute", icon: "🥰" },
    ];

    return (
        <div className="fade-in-up">
            <h2 className="main-title">Choose the Vibe</h2>
            <p className="subtitle">How should this letter sound?</p>

            <div className="option-grid">
                {tones.map((t) => (
                    <div
                        key={t.label}
                        className={`option-chip ${form.tone === t.label ? "active" : ""}`}
                        onClick={() => update("tone", t.label)}
                        style={{ fontSize: "1.1rem" }}
                    >
                        <span style={{ marginRight: 8 }}>{t.icon}</span>
                        {t.label}
                    </div>
                ))}
            </div>

            <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "32px" }}>
                <button className="nav-btn" onClick={back}>Back</button>
                <button
                    className="glow-btn"
                    onClick={next}
                    disabled={!form.tone}
                >
                    Continue
                </button>
            </div>
        </div>
    );
}
