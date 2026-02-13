export default function CherryScene({ onNext }) {
  return (
    <>
      {/* Background Video */}
      <video
        src="/videos/cherry.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      />

      {/* Center */}
      <div className="scene-center">
        <div className="glass-box">
          <h1 className="main-title">
            How far will you go for love
          </h1>

          <button
            className="glow-btn"
            onClick={() => onNext && onNext()}
          >
            Begin the Journey
          </button>
        </div>
      </div>

      {/* Bottom text */}
      <div
        style={{
          position: "fixed",
          bottom: 30,
          width: "100%",
          textAlign: "center",
          color: "rgba(255,255,255,0.8)",
          zIndex: 3,
          fontSize: 16,
        }}
      >
        Some stories begin with a single feeling...
      </div>
    </>
  );
}


