export default function PanelVideo({ src, children }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        flexShrink: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Background Video */}
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      />

      {/* Glass Panel */}
      <div className="glass-box">{children}</div>
    </div>
  );
}
