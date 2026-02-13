import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
// ❌ REMOVED Confetti import
import "./FinalLovePage.css";

// 🎥 VISUALS (Muted)
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

    // Controls the "Tap to Begin" and Story Slides
    const [showText, setShowText] = useState(true);

    // Controls the Final Card Visibility
    const [showFinalCard, setShowFinalCard] = useState(false);

    // Fetch Data
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

    // ⏳ TIMER LOGIC: Hide the Final Card after 6 seconds
    useEffect(() => {
        if (isFinished) {
            setShowFinalCard(true);

            // Wait 6 seconds, then vanish the card
            const timer = setTimeout(() => {
                setShowFinalCard(false);
            }, 6000);

            return () => clearTimeout(timer);
        }
    }, [isFinished]);

    if (loading) return <div className="loading-screen">❤️ Loading...</div>;
    if (error) return <div className="loading-screen">💔 Expired.</div>;

    // Script Logic
    const getMessage = () => {
        if (data.pageType === 'confession') {
            return [
                { title: `Hey ${data.partnerName}...`, subtitle: "I've been holding this back for a while." },
                { title: "It all started...", subtitle: `"${data.feelingsStart}"` },
                { title: "What I admire most...", subtitle: `Is your ${data.admireMost}.` },
                { title: "And now...", subtitle: "I have just one question for you..." }
            ][step];
        } else {
            return [
                { title: `To ${data.partnerName}`, subtitle: `Celebrating our ${data.relationshipStatus} ✨` },
                { title: "You make me feel...", subtitle: `So ${data.feelings ? data.feelings.join(", ") : "happy"} ❤️` },
                { title: "Remember this?", subtitle: `"${data.memoryText}"` },
                { title: `I love ${data.appreciation}`, subtitle: `Can't wait for ${data.future}` }
            ][step];
        }
    };

    const content = getMessage() || {};
    const toneKey = data.tone ? data.tone.toLowerCase() : 'default';

    // ⚡ PAUSE LOGIC (Visuals only)
    const handleTimeUpdate = () => {
        if (!videoRef.current || isFinished) return;

        const currentTime = videoRef.current.currentTime;
        const targetTime = (step + 1) * 8;

        if (currentTime >= targetTime && currentTime < targetTime + 0.3) {
            videoRef.current.pause();
            setShowText(true);
        }
    };

    // ⏭️ NEXT BUTTON LOGIC
    const handleNext = () => {
        setShowText(false);

        if (!videoStarted) {
            setVideoStarted(true);

            videoRef.current.play();
            if (audioRef.current) {
                audioRef.current.volume = 0.6;
                audioRef.current.play().catch(e => console.log("Audio play failed:", e));
            }

        } else if (step < 3) {
            setStep(prev => prev + 1);
            videoRef.current.play();
        } else {
            // 🎉 FINAL STEP
            setIsFinished(true);
            videoRef.current.play(); // Keep looping background
        }
    };

    const isOverlayDark = showText || (isFinished && showFinalCard);

    return (
        <div className={`final-page theme-${toneKey}`}>

            {/* ❌ REMOVED CONFETTI COMPONENT HERE */}

            <audio ref={audioRef} src={MUSIC_SOURCE} loop />

            {/* Video Container */}
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

            {/* 📝 TEXT SLIDES */}
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
                        <h1>{data.pageType === 'confession' ? "Will you?" : "Forever Us"}</h1>
                        <p className="final-msg">{data.pageType === 'confession' ? data.theQuestion : data.future}</p>

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