import { useEffect, useRef } from "react";

export default function IntroVideo({ onNext }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // When video finishes → go next
    const handleEnd = () => {
      if (onNext) onNext();
    };

    v.addEventListener("ended", handleEnd);

    return () => {
      v.removeEventListener("ended", handleEnd);
    };
  }, [onNext]);

  return (
    <div
      className="scene-wrapper"
      style={{
        background: "black"
      }}
    >
      <video
        ref={videoRef}
        src="/videos/intro.mp4"
        autoPlay
        muted
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
    </div>
  );
}

