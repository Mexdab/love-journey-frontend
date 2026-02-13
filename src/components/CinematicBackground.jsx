import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function CinematicBackground({ videoSrc, imageSrc, text, subText, onNext }) {
    const [isVideoFinished, setIsVideoFinished] = useState(false);
    const videoRef = useRef(null);

    // 1. FORCE PLAY & HANDLE BROWSER INTERRUPTIONS
    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        // Reset state when source changes
        setIsVideoFinished(false);
        videoElement.load();

        const playPromise = videoElement.play();

        if (playPromise !== undefined) {
            playPromise.catch(error => {
                // IGNORE "AbortError" (This is normal when clicking 'Next' fast)
                if (error.name === "AbortError") return;

                // For real errors (like missing file), log it and skip to text
                console.error("Video Playback Error:", error);
                // Optional: Uncomment next line if you want to skip video on error
                // setIsVideoFinished(true); 
            });
        }
    }, [videoSrc]);

    // 2. SAFETY TIMER (Extended to 10 seconds)
    // Only forces text if video gets stuck for a LONG time.
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isVideoFinished) {
                console.log("Video taking too long (>10s). Showing options.");
                setIsVideoFinished(true);
            }
        }, 10000);

        return () => clearTimeout(timer);
    }, [isVideoFinished]);

    return (
        <div
            className="scene-container"
            // 🖱️ CLICK HANDLER: Only works AFTER video finishes
            onClick={() => isVideoFinished && onNext()}
            style={{
                position: "relative", width: "100%", height: "100vh",
                overflow: "hidden", cursor: isVideoFinished ? "pointer" : "default", background: "black"
            }}
        >

            {/* 1. STATIC IMAGE (The "Safety Net" Background) */}
            <img
                src={imageSrc}
                alt="End Frame"
                style={{
                    position: "absolute", width: "100%", height: "100%",
                    objectFit: "cover", zIndex: 1
                }}
            />

            {/* 2. VIDEO PLAYER */}
            <motion.video
                ref={videoRef}
                src={videoSrc}
                muted
                playsInline
                // 🛑 CRITICAL: Triggers the flow only when video naturally ends
                onEnded={() => {
                    console.log("Video ended naturally.");
                    setIsVideoFinished(true);
                }}

                // Animation: Fade out to reveal the image behind it
                initial={{ opacity: 1 }}
                animate={{ opacity: isVideoFinished ? 0 : 1 }}
                transition={{ duration: 1 }} // Slow, smooth dissolve

                style={{
                    position: "absolute", width: "100%", height: "100%",
                    objectFit: "cover", zIndex: 2
                }}
            />

            {/* 3. DARK OVERLAY (Makes text readable) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isVideoFinished ? 0.6 : 0 }}
                transition={{ duration: 1.5 }}
                style={{
                    position: "absolute", width: "100%", height: "100%",
                    background: "black", zIndex: 3
                }}
            />

            {/* 4. THE MESSAGE (Fades in LAST) */}
            {isVideoFinished && (
                <motion.div
                    className="content-layer"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }} // Wait 0.5s after video ends
                    style={{
                        position: "absolute", zIndex: 4, color: "white", textAlign: "center",
                        width: "100%", top: "50%", transform: "translateY(-50%)", padding: "0 20px"
                    }}
                >
                    <h1 style={{
                        fontSize: "2.5rem", marginBottom: "1rem", fontWeight: "bold",
                        textShadow: "0px 4px 10px rgba(0,0,0,0.8)"
                    }}>
                        {text}
                    </h1>

                    <p style={{ fontSize: "1.2rem", opacity: 0.9, marginBottom: "2rem" }}>
                        {subText}
                    </p>

                    <button
                        onClick={(e) => { e.stopPropagation(); onNext(); }}
                        style={{
                            padding: "12px 30px", fontSize: "1rem", borderRadius: "50px",
                            background: "rgba(255, 255, 255, 0.2)", backdropFilter: "blur(10px)",
                            color: "white", border: "1px solid rgba(255,255,255,0.5)",
                            cursor: "pointer", animation: "pulse 2s infinite"
                        }}
                    >
                        Tap to Continue
                    </button>
                </motion.div>
            )}

            <style>{`@keyframes pulse { 0% { opacity: 0.8; } 50% { opacity: 1; } 100% { opacity: 0.8; } }`}</style>
        </div>
    );
}