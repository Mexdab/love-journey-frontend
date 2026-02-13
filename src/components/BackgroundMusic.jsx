import { useEffect, useRef } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef(null);

  useEffect(() => {
    // Aggressive autoplay attempt
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // Set volume
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise.then(_ => {
          // Autoplay started!
        }).catch(error => {
          // Autoplay was prevented.
          // Fallback: One-time click listener just in case, but we try hard first.
          console.log("Autoplay blocked. Waiting for interaction.");
          const forcePlay = () => {
            audioRef.current.play();
            window.removeEventListener("click", forcePlay);
          };
          window.addEventListener("click", forcePlay);
        });
      }
    }
  }, []);

  return (
    <audio
      ref={audioRef}
      src="/music/bg.mp3"
      loop
      // Removed 'muted' prop to try full autoplay
      playsInline
      preload="auto"
      style={{ display: "none" }}
    />
  );
}
