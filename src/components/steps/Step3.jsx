export default function Step3({ form, update, next, back }) {
  const feelings = [
    "Safe",
    "Happy",
    "Loved",
    "Understood",
    "Motivated",
    "Calm",
    "Excited",
  ];

  const toggleFeeling = (f) => {
    const exists = form.feelings.includes(f);
    if (exists) {
      update("feelings", form.feelings.filter((x) => x !== f));
    } else if (form.feelings.length < 3) {
      update("feelings", [...form.feelings, f]);
    }
  };

  return (
    <div className="fade-in-up">
      <h2 className="main-title">How do they make you feel?</h2>
      <p className="subtitle">Select up to 3 feelings</p>

      <div className="option-grid">
        {feelings.map((f) => (
          <div
            key={f}
            className={`option-chip ${form.feelings.includes(f) ? "active" : ""}`}
            onClick={() => toggleFeeling(f)}
          >
            {f}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "32px" }}>
        <button className="nav-btn" onClick={back}>Back</button>
        <button
          className="glow-btn"
          onClick={next}
          disabled={form.feelings.length === 0}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
