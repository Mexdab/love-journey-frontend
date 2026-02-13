import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import "./SuccessPage.css"; // We will create this CSS below

export default function PaymentSuccessPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [copied, setCopied] = useState(false);

    // Get the SLUG passed from PreviewPage
    const slug = location.state?.slug;
    const finalLink = `${window.location.origin}/love/${slug}`;

    // Redirect if someone tries to open this page directly without a slug
    useEffect(() => {
        if (!slug) navigate("/");
    }, [slug, navigate]);

    const handleCopy = () => {
        navigator.clipboard.writeText(finalLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2s
    };

    if (!slug) return null;

    return (
        <div className="success-page">
            <Confetti recycle={false} numberOfPieces={500} />

            <motion.div
                className="success-card glass-card"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="icon-circle">
                    ✅
                </div>

                <h1>Payment Successful! 🎉</h1>
                <p className="subtitle">Your Love Page is ready to share.</p>

                <div className="link-box">
                    <input type="text" value={finalLink} readOnly />
                    <button onClick={handleCopy} className={copied ? "copied" : ""}>
                        {copied ? "Copied! 👌" : "Copy Link 📋"}
                    </button>
                </div>

                <div className="action-buttons">
                    <button className="whatsapp-btn" onClick={() => window.open(`https://wa.me/?text=I made this for you ❤️ ${finalLink}`, '_blank')}>
                        Share on WhatsApp 💬
                    </button>

                    <button className="view-btn" onClick={() => navigate(`/love/${slug}`)}>
                        Open Page Now 🚀
                    </button>
                </div>

            </motion.div>
        </div>
    );
}