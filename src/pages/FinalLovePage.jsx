import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Confetti from "react-confetti";
import "./FinalLovePage.css";

const MAIN_VIDEO_SOURCE = "/videos/romantic_full.mp4";

export default function FinalLovePage() {
    const { slug } = useParams();
    const videoRef = useRef(null);

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [step, setStep] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [videoStarted, setVideoStarted] = useState(false);

    // 🆕 CONTROLS VISIBILITY: Start true for the "Tap to Begin" screen
    const [showText, setShowText] = useState(true);

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

    // ⚡ PAUSE LOGIC
    const handleTimeUpdate = () => {
        if (!videoRef.current || isFinished) return;

        const currentTime = videoRef.current.currentTime;
        const targetTime = (step + 1) * 8;

        // If we reached the 8s, 16s, 24s mark...
        if (currentTime >= targetTime && currentTime < targetTime + 0.3) {
            videoRef.current.pause();
            // 🆕 SHOW THE TEXT NOW
            setShowText(true);
        }
    };

    // ⏭️ NEXT BUTTON LOGIC
    const handleNext = () => {
        // 🆕 ALWAYS HIDE TEXT FIRST
        setShowText(false);

        if (!videoStarted) {
            setVideoStarted(true);
            videoRef.current.play();
        } else if (step < 3) {
            setStep(prev => prev + 1);
            videoRef.current.play();
        } else {
            setIsFinished(true);
            // Optional: Play video to end or keep it paused
            videoRef.current.play();
        }
    };

    return (
        <div className={`final-page theme-${toneKey}`}>
            {isFinished && <Confetti recycle={true} numberOfPieces={300} />}

            {/* Video Container */}
            <div className="video-wrapper">
                <video
                    ref={videoRef}
                    src={MAIN_VIDEO_SOURCE}
                    className="fullscreen-video"
                    playsInline
                    onTimeUpdate={handleTimeUpdate}
                    preload="auto"
                />
                {/* Overlay is darker only when text is showing */}
                <div className={`video-overlay ${showText || isFinished ? 'dark-mode' : ''}`}></div>
            </div>

            {/* 📝 TEXT SLIDES (Only visible if showText is TRUE) */}
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
            {isFinished && (
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