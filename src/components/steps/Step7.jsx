import { useNavigate } from "react-router-dom"; // 1. Import Navigation
import { Sparkles } from "lucide-react";

export default function Step7({ form, update, back }) {
    const navigate = useNavigate(); // 2. Setup Hook

    const tones = [
        { label: "Romantic", icon: "🌹" },
        { label: "Playful", icon: "😉" },
        { label: "Deep", icon: "🌌" },
        { label: "Cute", icon: "🥰" },
    ];

    // 🚀 THE MAGIC FUNCTION
    const handleFinish = () => {
        // Prepare the final data bundle
        const finalData = {
            pageType: 'relationship',

            // Identity
            relationshipStatus: form.relationship,
            yourName: form.yourName || "Me",
            showYourName: form.showYourName,
            partnerName: form.partnerName,

            // Core Content
            feelings: form.feelings,
            memoryEnabled: form.memoryEnabled,
            memoryType: form.memoryType,
            memoryText: form.memoryText,
            appreciation: form.appreciation,
            appreciationCustom: form.appreciationCustom,
            future: form.future,

            // The Vibe they just picked
            tone: form.tone,

            // ❌ No Photos
            photos: []
        };

        // Go straight to Preview!
        navigate("/preview", { state: finalData });
    };

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

                {/* 3. Button now calls handleFinish instead of next() */}
                <button
                    className="glow-btn"
                    onClick={handleFinish}
                    disabled={!form.tone}
                >
                    {form.tone ? "Finish & Preview ✨" : "Select a Vibe"}
                </button>
            </div>
        </div>
    );
}
