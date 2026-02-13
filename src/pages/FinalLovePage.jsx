import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "./FinalLovePage.css";

// 🎥 VISUALS
const MAIN_VIDEO_SOURCE = "/videos/romantic_full.mp4";

// 🎵 MUSIC
const MUSIC_SOURCE = "/music/bg.mp3";

export default function FinalLovePage() {
    const { slug } = useParams();
    const videoRef = useRef(null);
    const audioRef = useRef(null);

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [step, setStep] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [videoStarted, setVideoStarted] = useState(false);

    const [showText, setShowText] = useState(true);
    const [showFinalCard, setShowFinalCard] = useState(false);

    // Fetch Data from Backend
    useEffect(() => {
        const API_BASE_URL = "https://love-journey-backend-eqyf.onrender.com";
        fetch(`${API_BASE_URL}/api/love/${slug}`)
            .then(res => {
                if (!res.ok) throw new Error("Page not found");
                return res.json();
            })
            .then(dbData => {
                setData(dbData);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error:", err);
                setError(true);
                setLoading(false);
            });
    }, [slug]);

    // Script Text Logic
    const getMessage = () => {
        if (!data) return {};
        const partner = data.partnerName || "My Love";

        if (data.pageType === 'confession') {
            let nervousIntro = "I've been hiding this for a while.";
            const level = data.nervousLevel ? data.nervousLevel.toLowerCase() : "";
            if (level.includes("terrified")) nervousIntro = "Honestly? I'm terrified to say this... 😰";
            else if (level.includes("racing")) nervousIntro = "My heart is racing right now... 💓";
            else if (level.includes("very")) nervousIntro = "I'm really nervous, but I have to say it.";

            return [
                { title: `Hey ${partner}...`, subtitle: nervousIntro },
                { title: "It all started when...", subtitle: `"${data.feelingsStart}"` },
                { title: "I can't stop thinking about...", subtitle: `Your ${data.admireMost}.\nIt makes you so special to me.` },
                { title: "And now...", subtitle: "I have something important to ask..." }
            ][step];
        } else {
            let feelingsText = "happy";
            if (data.feelings && data.feelings.length > 0) {
                const f = data.feelings;
                if (f.length === 1) feelingsText = f[0];
                else if (f.length === 2) feelingsText = `${f[0]} and ${f[1]}`;
                else feelingsText = `${f.slice(0, -1).join(", ")}, and ${f[f.length - 1]}`;
            }
            return [
                { title: `To My Dearest ${partner},`, subtitle: `Celebrating our beautiful journey of being\n✨ ${data.relationshipStatus} ✨` },
                { title: "You make me feel...", subtitle: `So ${feelingsText}.\n(And I cherish every moment ❤️)` },
                { title: `I'll never forget our ${data.memoryType || "special memories"}...`, subtitle: `"${data.memoryText}"` },
                { title: `I love your ${data.appreciation}`, subtitle: `And I'm dreaming of ${data.future} with you.` }
            ][step];
        }
    };

    // ⚡ SYNC LOGIC: Detects pauses and loops
    const handleTimeUpdate = () => {
        const video = videoRef.current;
        if (!video) return;

        const currentTime = video.currentTime;

        // 🔄 1. DETECT FULL LOOP RESTART
        // If the video finishes and jumps back to start, reset the UI
        if (isFinished && currentTime < 0.5) {
            setStep(0);
            setIsFinished(false);
            setShowText(true);
            setShowFinalCard(false);
        }

        // 🛑 2. PAUSE LOGIC FOR STEPS
        // Pause at 8s, 16s, 24s, 32s marks
        if (isFinished) return;
        const targetTime = (step + 1) * 8;

        if (currentTime >= targetTime && currentTime < targetTime + 0.5 && !showText) {
            video.pause();
            setShowText(true);
        }
    };

    // ⏭️ NEXT BUTTON / TAP LOGIC
    const handleNext = () => {
        setShowText(false);

        if (!videoStarted) {
            setVideoStarted(true);
            videoRef.current.play();
            if (audioRef.current) {
                audioRef.current.volume = 0.6;
                audioRef.current.play().catch(e => console.log("Audio failed:", e));
            }
        } else if (step < 3) {
            setStep(prev => prev + 1);
            videoRef.current.play();
        } else {
            // 🎉 FINAL STEP REACHED
            setIsFinished(true);
            setShowFinalCard(true);
            videoRef.current.play();
        }
    };

    if (loading) return <div className="loading-screen">❤️ Loading...</div>;
    if (error) return <div className="loading-screen">💔 Expired.</div>;

    const content = getMessage() || {};
    const toneKey = data.tone ? data.tone.toLowerCase() : 'default';
    const isOverlayDark = showText || (isFinished && showFinalCard);

    return (
        <div className={`final-page theme-${toneKey}`}>
            <audio ref={audioRef} src={MUSIC_SOURCE} loop />

            <div className="video-wrapper">
                <video
                    ref={videoRef}
                    src={MAIN_VIDEO_SOURCE}
                    className="fullscreen-video"
                    playsInline
                    muted={true}
                    loop={true}
                    onTimeUpdate={handleTimeUpdate}
                    preload="auto"
                />
                <div className={`video-overlay ${isOverlayDark ? 'dark-mode' : ''}`}></div>
            </div>

            {/* 📝 STORY SLIDES */}
            {!isFinished && showText && (
                <div className="content-layer" onClick={handleNext}>
                    {!videoStarted ? (
                        <div className="glass-box">
                            <h1>For {data.partnerName} ❤️</h1>
                            <p>(Tap to begin)</p>
                        </div>
                    ) : (
                        <div className="glass-box" key={step}>
                            <h1 className="cinematic-title">{content.title}</h1>
                            <p className="cinematic-subtitle">{content.subtitle}</p>
                            <div className="tap-hint">Tap to continue</div>
                        </div>
                    )}
                </div>
            )}

            {/* 💌 FINAL CARD */}
            {isFinished && showFinalCard && (
                <div className="final-layer">
                    <div className="glass-card">
                        <h1>{data.pageType === 'confession' ? "My Confession" : "Forever Us"}</h1>
                        <p className="final-msg">
                            {data.pageType === 'confession' ? data.theQuestion : `Here's to ${data.future} ❤️`}
                        </p>
                        {data.photos && data.photos.length > 0 && (
                            <img src={data.photos[0].url} alt="Us" className="final-img" />
                        )}
                        <div className="sign-off">Love, {data.yourName}</div>
                    </div>
                </div>
            )}
        </div>
    );
}