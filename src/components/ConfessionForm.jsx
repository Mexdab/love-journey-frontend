import { useState } from "react";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import Navigation

export default function ConfessionForm({ gender }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    start: "",
    admire: "",
    nervous: "",
    ask: "",
    tone: "",
  });

  const next = () => setStep((s) => Math.min(s + 1, 5));
  const back = () => setStep((s) => Math.max(s - 1, 1));
  const update = (k, v) => setData((p) => ({ ...p, [k]: v }));

  const handleFinish = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      // 🚀 MASTER MAPPING: Sends data to specific Backend columns
      const formattedData = {
        pageType: 'confession',
        yourName: "Admirer",        // Default for anonymous confession
        partnerName: "My Crush",    // Default placeholder
        yourGender: "unknown",
        partnerGender: gender || "unknown",

        // 1-to-1 Mapping to your New Master Schema
        feelingsStart: data.start,
        admireMost: data.admire,
        nervousLevel: data.nervous,
        theQuestion: data.ask,
        tone: data.tone,

        photos: [] // No photos in this flow
      };

      navigate("/preview", { state: formattedData });
    }, 1500);
  };

  const progress = (step / 5) * 100;

  return (
    <div className="fade-in-up">
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>

      {step === 1 && (
        <div className="fade-in-up">
          <h2 className="main-title">When did your feelings begin?</h2>
          <div className="input-group">
            <input className="premium-input" placeholder="e.g. Since the day we first met..." value={data.start} onChange={(e) => update("start", e.target.value)} />
          </div>
          <button className="glow-btn" onClick={next} disabled={!data.start}>Continue</button>
        </div>
      )}

      {step === 2 && (
        <div className="fade-in-up">
          <h2 className="main-title">What do you admire most?</h2>
          <div className="input-group">
            <input className="premium-input" placeholder="e.g. Their smile, kindness..." value={data.admire} onChange={(e) => update("admire", e.target.value)} />
          </div>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "32px" }}>
            <button className="nav-btn" onClick={back}>Back</button>
            <button className="glow-btn" onClick={next} disabled={!data.admire}>Continue</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="fade-in-up">
          <h2 className="main-title">How nervous are you?</h2>
          <div className="option-grid">
            {["A little", "Very", "Heart racing", "Terrified 😅"].map((n) => (
              <div key={n} className={`option-chip ${data.nervous === n ? "active" : ""}`} onClick={() => update("nervous", n)}>{n}</div>
            ))}
          </div>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "32px" }}>
            <button className="nav-btn" onClick={back}>Back</button>
            <button className="glow-btn" onClick={next} disabled={!data.nervous}>Continue</button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="fade-in-up">
          <h2 className="main-title">What do you want to ask?</h2>
          <div className="input-group">
            <input className="premium-input" placeholder="Will you be mine? / Will you go out with me?" value={data.ask} onChange={(e) => update("ask", e.target.value)} />
          </div>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "32px" }}>
            <button className="nav-btn" onClick={back}>Back</button>
            <button className="glow-btn" onClick={next} disabled={!data.ask}>Continue</button>
          </div>
        </div>
      )}

      {step === 5 && (
        <div className="fade-in-up">
          <h2 className="main-title">Choose the vibe</h2>
          <div className="option-grid">
            {["Cute 💕", "Romantic ✨", "Deep 🖤", "Playful 😄"].map((t) => (
              <div key={t} className={`option-chip ${data.tone === t ? "active" : ""}`} onClick={() => update("tone", t)}>{t}</div>
            ))}
          </div>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "32px" }}>
            <button className="nav-btn" onClick={back}>Back</button>

            <button className="glow-btn" onClick={handleFinish} disabled={!data.tone || loading}>
              {loading ? <><Sparkles className="spin" size={18} style={{ marginRight: 8 }} /> Creating...</> : "Preview & Pay →"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}