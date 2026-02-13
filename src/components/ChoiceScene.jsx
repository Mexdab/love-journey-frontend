import { useState, useEffect } from "react";
import { Heart, User, ArrowRight } from "lucide-react";
import LoveForm from "./LoveForm";
import ConfessionForm from "./ConfessionForm";
import PanelVideo from "./PanelVideo";

export default function ChoiceScene({ goToConfess, goToLove }) {
  const [stage, setStage] = useState("mode"); // mode → gender → confess → love
  const [mode, setMode] = useState(null);
  const [gender, setGender] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 50);
  }, []);

  const getSlide = () => {
    if (stage === "mode") return "translateX(0%)";
    if (stage === "gender") return "translateX(-25%)";
    if (stage === "confess") return "translateX(-50%)";
    if (stage === "love") return "translateX(-75%)";
  };

  const handleModeSelect = (selectedMode) => {
    setMode(selectedMode);
    setStage("gender");
  };

  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender);
    // Auto-advance after small delay for better UX
    setTimeout(() => {
      setStage(mode === "confess" ? "confess" : "love");
    }, 300);
  };

  return (
    <div className="scene-wrapper" style={{ opacity: visible ? 1 : 0, transition: "opacity 1s ease" }}>

      {/* SLIDER */}
      <div
        style={{
          display: "flex",
          width: "400%",
          height: "100%",
          transform: getSlide(),
          transition: "transform 1s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        {/* ================= PANEL 1 — MODE SELECTION ================= */}
        <PanelVideo src="/videos/choice.mp4">
          <div className="fade-in-up">
            <h2 className="main-title">Tell me about your heart</h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginTop: "40px" }}>

              {/* Option 1: Single */}
              <div
                className="glass-box"
                style={{ padding: "30px", width: "auto", cursor: "pointer", borderRadius: "24px" }}
                onClick={() => handleModeSelect("confess")}
              >
                <User size={48} style={{ marginBottom: "16px", color: "#ff7e5f" }} />
                <h3>I am Single</h3>
                <p style={{ fontSize: "14px", opacity: 0.8 }}>I want to confess my feelings</p>
              </div>

              {/* Option 2: Taken */}
              <div
                className="glass-box"
                style={{ padding: "30px", width: "auto", cursor: "pointer", borderRadius: "24px" }}
                onClick={() => handleModeSelect("love")}
              >
                <Heart size={48} style={{ marginBottom: "16px", color: "#ff3e6c" }} />
                <h3>I am in Love</h3>
                <p style={{ fontSize: "14px", opacity: 0.8 }}>I want to appreciate my partner</p>
              </div>

            </div>
          </div>
        </PanelVideo>

        {/* ================= PANEL 2 — GENDER SELECTION ================= */}
        <PanelVideo src="/videos/gender.mp4">
          <div className="fade-in-up">
            <h2 className="main-title">Select your gender</h2>
            <p className="subtitle">Helps us personalize the letter</p>

            <div className="gender-switch" style={{ marginTop: "40px", gap: "20px" }}>
              {["Male", "Female", "Other"].map((g) => (
                <div
                  key={g}
                  className={`option-chip ${gender === g ? "active" : ""}`}
                  onClick={() => handleGenderSelect(g)}
                  style={{ padding: "16px 32px", fontSize: "18px" }}
                >
                  {g}
                </div>
              ))}
            </div>

            <div style={{ marginTop: "40px", opacity: 0.6, fontSize: "14px" }}>
              Auto-continues on selection...
            </div>
          </div>
        </PanelVideo>

        {/* ================= PANEL 3 — CONFESSION FORM ================= */}
        <PanelVideo src="/videos/confession.mp4">
          {/* Passed gender prop */}
          <ConfessionForm gender={gender} />
        </PanelVideo>

        {/* ================= PANEL 4 — LOVE FORM ================= */}
        <PanelVideo src="/videos/love.mp4">
          {/* Passed gender prop */}
          <LoveForm gender={gender} />
        </PanelVideo>
      </div>
    </div>
  );
}
