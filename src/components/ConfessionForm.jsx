import { useState } from "react";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ConfessionForm({ gender }) {
  const navigate = useNavigate();
  // 1️⃣ START AT STEP 1 (Now the Name Step)
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // 2️⃣ ADDED "yourName" AND "partnerName" TO STATE
  const [data, setData] = useState({
    yourName: "",
    partnerName: "",
    start: "",
    admire: "",
    nervous: "",
    ask: "",
    tone: "",
  });

  // 3️⃣ INCREASE MAX STEPS TO 6
  const next = () => setStep((s) => Math.min(s + 1, 6));
  const back = () => setStep((s) => Math.max(s - 1, 1));
  const update = (k, v) => setData((p) => ({ ...p, [k]: v }));

  const handleFinish = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      const formattedData = {
        pageType: 'confession',
        // 4️⃣ USE THE REAL NAMES HERE
        yourName: data.yourName || "Secret Admirer",
        partnerName: data.partnerName || "My Crush",

        yourGender: "unknown",
        partnerGender: gender || "unknown",

        feelingsStart: data.start,
        admireMost: data.admire,
        nervousLevel: data.nervous,
        theQuestion: data.ask,
        tone: data.tone,

        photos: []
      };

      navigate("/preview", { state: formattedData });
    }, 1500);
  };

  // Update progress bar for 6 steps
  const progress = (step / 6) * 100;

  return (
    <div className="fade-in-up">
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>

      {/* ✨ NEW STEP 1: NAMES ✨ */}
      {step === 1 && (
        <div className="fade-in-up">
          <h2 className="main-title">Let's start with names</h2>

          <div className="input-group">
            <label style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '5px', display: 'block' }}>Who is this for?</label>
            <input
              className="premium-input"
              placeholder="Crush's Name"
              value={data.partnerName}
              onChange={(e) => update("partnerName", e.target.value)}
            />
          </div>

          <div className="input-group" style={{ marginTop: '20px' }}>
            <label style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '5px', display: 'block' }}>Your Name (or Secret?)</label>
            <input
              className="premium-input"
              placeholder="Your Name"
              value={data.yourName}
              onChange={(e) => update("yourName", e.target.value)}
            />
          </div>

          <button className="glow-btn" onClick={next} disabled={!data.partnerName || !data.yourName}>
            Continue
          </button>
        </div>
      )}

      {/* STEP 2: Feelings Start */}
      {step === 2 && (
        <div className="fade-in-up">
          <h2 className="main-title">When did your feelings begin?</h2>
          <div className="input-group">
            <input className="premium-input" placeholder="e.g. Since the day we first met..." value={data.start} onChange={(e) => update("start", e.target.value)} />
          </div>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "32px" }}>
            <button className="nav-btn" onClick={back}>Back</button>
            <button className="glow-btn" onClick={next} disabled={!data.start}>Continue</button>
          </div>
        </div>
      )}

      {/* STEP 3: Admire */}
      {step === 3 && (
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

      {/* STEP 4: Nervous */}
      {step === 4 && (
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

      {/* STEP 5: Confession */}
      {step === 5 && (
        <div className="fade-in-up">
          <h2 className="main-title">Confession</h2>
          <div className="input-group">
            <input className="premium-input" placeholder=" I LOVE YOU" value={data.ask} onChange={(e) => update("ask", e.target.value)} />
          </div>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "32px" }}>
            <button className="nav-btn" onClick={back}>Back</button>
            <button className="glow-btn" onClick={next} disabled={!data.ask}>Continue</button>
          </div>
        </div>
      )}

      {/* STEP 6: Vibe (Final Step) */}
      {step === 6 && (
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
              {loading ? <><Sparkles className="spin" size={18} style={{ marginRight: 8 }} /> Creating...</> : "Create Page 💖"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}