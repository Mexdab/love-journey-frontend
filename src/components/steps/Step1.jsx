export default function Step1({ form, update, next }) {
  const options = [
    "Dating",
    "In a relationship",
    "Engaged",
    "Married",
    "It’s complicated 😅",
  ];

  return (
    <div className="fade-in-up">
      <h2 className="main-title">What’s your relationship status?</h2>

      <div className="option-grid">
        {options.map((opt) => (
          <div
            key={opt}
            className={`option-chip ${form.relationship === opt ? "active" : ""}`}
            onClick={() => update("relationship", opt)}
          >
            {opt}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "32px" }}>
        <button className="glow-btn" onClick={next} disabled={!form.relationship}>
          Continue
        </button>
      </div>
    </div>
  );
}
