import { Heart, Star, Sun, Smile, Coffee } from "lucide-react";

export default function Step5({ form, update, next, back }) {
  const options = [
    { label: "Kindness", icon: <Heart size={18} /> },
    { label: "Ambition", icon: <Star size={18} /> },
    { label: "Humor", icon: <Smile size={18} /> },
    { label: "Energy", icon: <Sun size={18} /> },
    { label: "Patience", icon: <Coffee size={18} /> },
  ];

  return (
    <div className="fade-in-up">
      <h2 className="main-title">What do you appreciate most?</h2>
      <p className="subtitle">Choose what makes them special to you.</p>

      <div className="option-grid">
        {options.map((opt) => (
          <div
            key={opt.label}
            className={`option-chip ${form.appreciation === opt.label ? "active" : ""}`}
            onClick={() => update("appreciation", opt.label)}
          >
            {opt.icon}
            {opt.label}
          </div>
        ))}
      </div>

      <div className="input-group">
        <input
          className="premium-input"
          placeholder="Or write something specific..."
          value={form.appreciationCustom || ""}
          onChange={(e) => update("appreciationCustom", e.target.value)}
        />
      </div>

      <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "32px" }}>
        <button className="nav-btn" onClick={back}>Back</button>
        <button
          className="glow-btn"
          onClick={next}
          disabled={!form.appreciation && !form.appreciationCustom}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
