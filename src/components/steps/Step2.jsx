export default function Step2({ form, update, next, back }) {
  return (
    <div className="fade-in-up">
      <h2 className="main-title">Tell me your names</h2>

      <div className="input-group">
        <input
          className="premium-input"
          placeholder="Your name"
          value={form.yourName}
          onChange={(e) => update("yourName", e.target.value)}
        />
      </div>

      <label className="option-chip" style={{ width: "fit-content", margin: "0 auto 20px" }}>
        <input
          type="checkbox"
          checked={form.showYourName}
          onChange={(e) => update("showYourName", e.target.checked)}
          style={{ marginRight: 10 }}
        />
        Show my name in letter
      </label>

      <div className="input-group">
        <input
          className="premium-input"
          placeholder="Partner's name"
          value={form.partnerName}
          onChange={(e) => update("partnerName", e.target.value)}
        />
      </div>

      <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "32px" }}>
        <button className="nav-btn" onClick={back}>Back</button>
        <button
          className="glow-btn"
          onClick={next}
          disabled={!form.partnerName}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
