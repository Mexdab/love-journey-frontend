import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Confetti from "react-confetti";
import "./FinalLovePage.css";

// 🎥 Ensure your video is in public/videos/romantic_full.mp4
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

    // 1. FETCH DATA FROM RENDER 🌍
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
                { title: `Hey ${data.partnerName}...`, subtitle: `I've been holding this back for a while.\n${nervousText}` },
                { title: "It all started...", subtitle: `"${data.feelingsStart}"\nSince then, everything changed.` },
                { title: "What I admire most...", subtitle: `Is your ${data.admireMost}.\nIt makes you so special to me.` },
                { title: "And now...", subtitle: "I have just one question for you..." }
            ][step];
        } else {
            const feelings = data.feelings || [];
            const feelingsString = feelings.length > 0
                ? feelings.join(", ").replace(/, ([^,]*)$/, ' and $1')
                : "happy";
            const memoryTitle = data.memoryType ? `Remember our ${data.memoryType}?` : "A Special Moment";

            return [
                { title: `To my favorite person, ${data.partnerName}`, subtitle: `Celebrating our beautiful journey of being\n✨ ${data.relationshipStatus} ✨` },
                { title: "You make me feel...", subtitle: `So ${feelingsString}.\n(And I mean every word of that ❤️)` },
                { title: memoryTitle, subtitle: `"${data.memoryText}"` },
                { title: `I love ${data.appreciationCustom || data.appreciation}`, subtitle: `I can't wait for ${data.future}.\n\nLove, ${data.showYourName ? data.yourName : "Me"}` }
            ][step];
        }
    };

    const content = getMessage() || {};
    const toneKey = data.tone ? data.tone.toLowerCase() : 'default';

    // ⚡ 3. THE PAUSE LOGIC
    const handleTimeUpdate = () => {
        if (!videoRef.current || isFinished) return;

        const currentTime = videoRef.current.currentTime;
        const targetTime = (step + 1) * 8; // Steps at 8, 16, 24, 32s

        if (currentTime >= targetTime && currentTime < targetTime + 0.3) {
            videoRef.current.pause();
        }
    };

    // ⏭️ 4. HANDLE "NEXT" CLICK
    const handleNext = () => {
        if (!videoStarted) {
            setVideoStarted(true);
            videoRef.current.play();
        } else if (step < 3) {
            setStep(prev => prev + 1);
            videoRef.current.play();
        } else {
            setIsFinished(true);
            videoRef.current.play();
        }
    };

    return (
        <div className={`final-page theme-${toneKey}`}>
            {isFinished && <Confetti recycle={true} numberOfPieces={300} />}

            <div className="video-background-container">
                <video
                    ref={videoRef}
                    src={MAIN_VIDEO_SOURCE}
                    className="cinematic-video"
                    playsInline
                    onTimeUpdate={handleTimeUpdate}
                    preload="auto"
                />
                <div className={`video-overlay ${isFinished ? 'darker-overlay' : ''}`}></div>
            </div>

            {!isFinished && (
                <div className="cinematic-content" onClick={handleNext}>
                    {!videoStarted ? (
                        <div className="start-prompt">
                            <h1>For {data.partnerName} ❤️</h1>
                            <p>(Tap to begin your journey)</p>
                        </div>
                    ) : (
                        <div className="text-slide fade-in" key={step}>
                            <h1 className="cinematic-title">{content.title}</h1>
                            <p className="cinematic-subtitle">{content.subtitle}</p>
                            <div className="tap-instruction">Tap to continue...</div>
                        </div>
                    )}
                </div>
            )}

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