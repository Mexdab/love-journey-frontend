export default function Step4({ form, update, next, back }) {
  const memoryTypes = [
    "First meeting",
    "First trip",
    "First fight we survived",
    "A random small moment",
  ];

  return (
    <div className="fade-in-up">
      <h2 className="main-title">Include a special memory?</h2>

      <div className="option-grid">
        <div
          className={`option-chip ${form.memoryEnabled ? "active" : ""}`}
          onClick={() => update("memoryEnabled", true)}
          style={{ width: "100px", justifyContent: "center" }}
        >
          Yes
        </div>

        <div
          className={`option-chip ${!form.memoryEnabled ? "active" : ""}`}
          onClick={() => update("memoryEnabled", false)}
          style={{ width: "100px", justifyContent: "center" }}
        >
          Skip
        </div>
      </div>

      {form.memoryEnabled && (
        <div className="fade-in-up delay-1">
          <h3 style={{ margin: "20px 0 10px" }}>Select memory type</h3>

          <div className="option-grid">
            {memoryTypes.map((m) => (
              <div
                key={m}
                className={`option-chip ${form.memoryType === m ? "active" : ""}`}
                onClick={() => update("memoryType", m)}
              >
                {m}
              </div>
            ))}
          </div>

          <div className="input-group">
            <textarea
              className="premium-input"
              placeholder="Briefly describe the memory (max 120 chars)"
              maxLength={120}
              value={form.memoryText}
              onChange={(e) => update("memoryText", e.target.value)}
              style={{ minHeight: "80px", resize: "none" }}
            />
          </div>
        </div>
      )}

      <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "32px" }}>
        <button className="nav-btn" onClick={back}>Back</button>
        <button
          className="glow-btn"
          onClick={next}
          disabled={form.memoryEnabled && (!form.memoryType || !form.memoryText)}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
