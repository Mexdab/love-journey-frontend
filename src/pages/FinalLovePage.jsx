import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Confetti from "react-confetti";
import "./FinalLovePage.css";

// 🗺️ VIDEO ASSET MAP (Ensure these videos are 40s+ long)
const THEME_VIDEOS = {
    romantic: "/videos/romantic_full.mp4",
    playful: "/videos/playful_full.mp4",
    deep: "/videos/deep_full.mp4",
    cute: "/videos/cute_full.mp4",
    default: "/videos/romantic_full.mp4"
};

export default function FinalLovePage() {
    const { slug } = useParams();
    const videoRef = useRef(null);

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [step, setStep] = useState(0); // 0, 1, 2, 3 (Slides), 4 (End)
    const [isFinished, setIsFinished] = useState(false);
    const [videoStarted, setVideoStarted] = useState(false);

    // 1. FETCH DATA 🌍
    useEffect(() => {
        const API_BASE_URL = import.meta.env.VITE_API_URL || "https://love-journey-backend-eqyf.onrender.com";

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
                console.error("Error fetching story:", err);
                setError(true);
                setLoading(false);
            });
    }, [slug]);

    if (loading) return <div className="loading-screen">❤️ Loading your story...</div>;
    if (error) return <div className="loading-screen">💔 Story not found or expired.</div>;

    // 2. THE SCRIPTWRITER (4 Acts) 📝
    const getMessage = () => {
        if (data.pageType === 'confession') {
            let nervousText = "I'm a little shy...";
            const level = data.nervousLevel ? data.nervousLevel.toLowerCase() : "";
            if (level.includes("terrified")) nervousText = "Honestly? I'm terrified to say this 😰";
            else if (level.includes("heart")) nervousText = "My heart is pounding right now 💓";

            return [
                // Step 0: 0-8s
                { title: `Hey ${data.partnerName}...`, subtitle: `I've been holding this back for a while.\n${nervousText}` },
                // Step 1: 8-16s
                { title: "It all started...", subtitle: `"${data.feelingsStart}"\nSince then, everything changed.` },
                // Step 2: 16-24s
                { title: "What I admire most...", subtitle: `Is your ${data.admireMost}.\nIt makes you so special to me.` },
                // Step 3: 24-32s (The Buildup)
                { title: "And now...", subtitle: "I have just one question for you..." }
            ][step];
        } else {
            const feelings = data.feelings || [];
            const feelingsString = feelings.join(", ").replace(/, ([^,]*)$/, ' and $1');
            const memoryTitle = data.memoryType ? `Remember our ${data.memoryType}?` : "A Special Moment";

            return [
                // Step 0: 0-8s
                { title: `To my favorite person, ${data.partnerName}`, subtitle: `Celebrating our beautiful journey of being\n✨ ${data.relationshipStatus} ✨` },
                // Step 1: 8-16s
                { title: "You make me feel...", subtitle: `So ${feelingsString}.\n(And I mean every word of that ❤️)` },
                // Step 2: 16-24s
                { title: memoryTitle, subtitle: `"${data.memoryText}"` },
                // Step 3: 24-32s
                { title: `I love ${data.appreciationCustom || data.appreciation}`, subtitle: `I can't wait for ${data.future}.\n\nLove, ${data.showYourName ? data.yourName : "Me"}` }
            ][step];
        }
    };

    const content = getMessage() || {};
    const toneKey = data.tone ? data.tone.toLowerCase() : 'default';
    const videoSrc = THEME_VIDEOS[toneKey] || THEME_VIDEOS.default;

    // ⚡ 3. THE 32-SECOND PAUSE LOGIC
    const handleTimeUpdate = () => {
        if (!videoRef.current || isFinished) return; // Don't pause if finished!

        const currentTime = videoRef.current.currentTime;
        const targetTime = (step + 1) * 8; // Targets: 8, 16, 24, 32

        // If we hit the target time (with small buffer), PAUSE
        if (currentTime >= targetTime && currentTime < targetTime + 0.5) {
            videoRef.current.pause();
        }
    };

    // ⏭️ 4. HANDLE "NEXT" CLICK
    const handleNext = () => {
        if (!videoStarted) {
            // Start Video
            setVideoStarted(true);
            videoRef.current.play();
        } else if (step < 3) {
            // Move to next slide (0->1, 1->2, 2->3) and Resume Video
            setStep(prev => prev + 1);
            videoRef.current.play();
        } else {
            // STEP 4: Play to End (Finish)
            setIsFinished(true);
            videoRef.current.play(); // This plays past 32s to the end
        }
    };

    return (
        <div className={`final-page theme-${toneKey}`}>
            {isFinished && <Confetti recycle={true} numberOfPieces={300} />}

            {/* 🎥 VIDEO (Remains visible even when finished for 'Play to End' effect) */}
            <div className="video-background-container">
                <video
                    ref={videoRef}
                    src={videoSrc}
                    className="cinematic-video"
                    playsInline
                    muted={false}
                    onTimeUpdate={handleTimeUpdate}
                    preload="auto"
                />
                <div className={`video-overlay ${isFinished ? 'darker-overlay' : ''}`}></div>
            </div>

            {/* 📜 TEXT SLIDES (Hidden when finished) */}
            {!isFinished && (
                <div className="cinematic-content fade-in" onClick={handleNext}>
                    {!videoStarted ? (
                        <div className="start-prompt">
                            <h1>For {data.partnerName} ❤️</h1>
                            <p>(Tap to begin)</p>
                        </div>
                    ) : (
                        <>
                            <h1 className="cinematic-title">{content.title}</h1>
                            <p className="cinematic-subtitle">{content.subtitle}</p>
                            <div className="tap-instruction">(Tap to continue)</div>
                        </>
                    )}
                </div>
            )}

            {/* 💌 FINAL CARD (Appears at Step 4) */}
            {isFinished && (
                <div className="overlay fade-in">
                    <div className="glass-card final-card">
                        <h1>{data.pageType === 'confession' ? "Will you?" : "Forever Us"}</h1>
                        <p className="final-message">
                            {data.pageType === 'confession'
                                ? data.theQuestion
                                : `Here's to ${data.future} ❤️`}
                        </p>

                        {data.photos && data.photos.length > 0 && (
                            <div className="final-photo-container">
                                <img src={data.photos[0].url} alt="Us" className="final-photo-preview" />
                            </div>
                        )}

                        <div className="signature">
                            With all my love,<br />
                            <strong>{data.showYourName ? data.yourName : "Your Secret Admirer"}</strong>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}