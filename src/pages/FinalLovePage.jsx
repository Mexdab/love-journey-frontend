import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Confetti from "react-confetti";
import CinematicBackground from "../components/CinematicBackground";
import "./FinalLovePage.css";

// 🗺️ VIDEO ASSET MAP (Must match your public/videos/ folder EXACTLY)
const VIDEO_ASSETS = {
    romantic: [
        { video: "/videos/romantic_1_intro.mp4", image: "/videos/romantic_1_end.png" },
        { video: "/videos/romantic_2_past.mp4", image: "/videos/romantic_2_end.png" },
        { video: "/videos/romantic_3_present.mp4", image: "/videos/romantic_3_end.png" },
        { video: "/videos/romantic_4_future.mp4", image: "/videos/romantic_4_end.png" }
    ],
    // Add 'playful', 'deep', 'cute' arrays here if/when you have them
    default: [
        { video: "/videos/romantic_1_intro.mp4", image: "/videos/romantic_1_end.png" },
        { video: "/videos/romantic_2_past.mp4", image: "/videos/romantic_2_end.png" },
        { video: "/videos/romantic_3_present.mp4", image: "/videos/romantic_3_end.png" },
        { video: "/videos/romantic_4_future.mp4", image: "/videos/romantic_4_end.png" }
    ]
};

export default function FinalLovePage() {
    const { slug } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [step, setStep] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    // 1. FETCH DATA FROM REAL BACKEND 🌍
    useEffect(() => {
        // Corrected URL to match your server.js route (/api/love)
        fetch(`http://localhost:5000/api/love/${slug}`)
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

    // 2. GET CURRENT ASSETS
    const toneKey = data.tone ? data.tone.toLowerCase() : 'default';
    const themeAssets = VIDEO_ASSETS[toneKey] || VIDEO_ASSETS.default;
    const currentScene = themeAssets[step] || themeAssets[themeAssets.length - 1];

    // 3. GENERATE TEXT CONTENT (Mapped to Mongoose Schema)
    const getMessage = () => {

        // 💔 FLOW 1: CONFESSION
        if (data.pageType === 'confession') {
            const texts = [
                // Step 1: Intro
                {
                    title: `Hey ${data.partnerName}...`,
                    subtitle: "I've been meaning to tell you something."
                },
                // Step 2: Feelings Start
                {
                    title: "It all started...",
                    subtitle: data.feelingsStart
                },
                // Step 3: Admire + Nervousness
                {
                    title: `I really admire ${data.admireMost}`,
                    subtitle: `(And honestly? My ${data.nervousLevel} right now 😅)`
                },
                // Step 4: The Question
                {
                    title: "So I have to ask...",
                    subtitle: data.theQuestion
                }
            ];
            return texts[step];
        }

        // ❤️ FLOW 2: RELATIONSHIP
        else {
            // Join feelings array: "Safe, Happy and Loved"
            const feelingsString = data.feelings && data.feelings.length > 0
                ? data.feelings.join(", ").replace(/, ([^,]*)$/, ' and $1')
                : "complete";

            // Handle custom appreciation text if provided
            const appreciationText = data.appreciationCustom || data.appreciation;

            const texts = [
                // Step 1: Dedication + Status
                {
                    title: `To my favorite person, ${data.partnerName}`,
                    subtitle: `Celebrating our beautiful ${data.relationshipStatus} journey.`
                },
                // Step 2: Memory (Schema: memoryType & memoryText)
                {
                    title: `Remember our ${data.memoryType}?`,
                    subtitle: `"${data.memoryText}"`
                },
                // Step 3: Appreciation + Feelings
                {
                    title: `I appreciate ${appreciationText}`,
                    subtitle: `You make me feel ${feelingsString}.`
                },
                // Step 4: Future (Schema: future) + Signature
                {
                    title: "Our Future",
                    subtitle: `${data.future} ✨ \n\n - Forever, ${data.showYourName ? data.yourName : "Me"}`
                }
            ];
            return texts[step];
        }
    };

    const content = getMessage();

    // 4. HANDLER: Go to Next Step
    const handleNext = () => {
        if (step < 3) {
            setStep(prev => prev + 1);
        } else {
            setIsFinished(true);
        }
    };

    return (
        <div className={`final-page theme-${data.tone ? data.tone.toLowerCase() : 'romantic'}`}>
            {isFinished && <Confetti recycle={true} numberOfPieces={300} />}

            {!isFinished && (
                <CinematicBackground
                    key={step}
                    videoSrc={currentScene.video}
                    imageSrc={currentScene.image}
                    text={content.title}
                    subText={content.subtitle}
                    onNext={handleNext}
                    data={data}
                />
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

                        {/* Optional Photo Display */}
                        {data.photos && data.photos.length > 0 && (
                            <div className="final-photo-container">
                                <img src={data.photos[0].url} alt="Us" className="final-photo-preview" />
                            </div>
                        )}

                        {data.pageType === 'confession' ? (
                            <div className="action-buttons">
                                <button className="yes-btn" onClick={() => alert("Make sure to call them!")}>YES! 💖</button>
                                <button className="talk-btn">Let's Talk 💬</button>
                            </div>
                        ) : (
                            <div className="signature">
                                With all my love,<br />
                                <strong>{data.showYourName ? data.yourName : "Your Secret Admirer"}</strong>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}