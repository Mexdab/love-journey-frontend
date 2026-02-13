import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PreviewPage.css';

// Pointing to your live Render Backend
const API_BASE_URL = "https://love-journey-backend-eqyf.onrender.com";

const PreviewPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // 1. Get ALL data passed from the Form
    const formDataRaw = location.state || {};

    const [isProcessing, setIsProcessing] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");

    // 2. Destructure for Preview Display (photos removed)
    const {
        yourName = "Admirer",
        partnerName = "My Love",
        pageType = "relationship",
        theme = "romantic",
        feelingsStart,
        admireMost,
        theQuestion,
        memoryType,
        memoryText,
        future,
        appreciation,
        appreciationCustom
    } = formDataRaw;

    // 🚀 NEW: Direct Creation Function (No Photos/No Razorpay)
    const handleCreate = async () => {
        setIsProcessing(true);
        setStatusMessage("Creating your Cinematic Journey... ✨");

        try {
            // Send all data directly to the backend 'create-page' route
            const response = await fetch(`${API_BASE_URL}/api/love/create-page`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formDataRaw)
            });

            const result = await response.json();

            if (result.success) {
                // C. Redirect to success page with the new slug
                navigate('/success', { state: { slug: result.slug } });
            } else {
                throw new Error(result.message || "Failed to create page");
            }

        } catch (error) {
            console.error("CREATION ERROR:", error);
            alert("Error: " + error.message);
            setIsProcessing(false);
        }
    };

    return (
        <div className={`preview-page theme-${theme.toLowerCase()}`}>
            <div className="payment-banner">
                💝 Surprise your partner with a cinematic love story.
            </div>

            <div className="preview-container">
                <header className="preview-header">
                    <h1 className="preview-title">A Preview of Your Journey</h1>
                    <div className="partner-name">{partnerName}</div>
                    <div className="from-text">From {yourName}</div>
                </header>

                {pageType === 'confession' ? (
                    <>
                        <div className="story-section">
                            <div className="section-icon">📅</div>
                            <h3 className="section-title">The Beginning</h3>
                            <div className="section-content">{feelingsStart}</div>
                        </div>
                        <div className="story-section">
                            <div className="section-icon">✨</div>
                            <h3 className="section-title">What I Admire</h3>
                            <div className="section-content">I admire your {admireMost}</div>
                        </div>
                        <div className="story-section">
                            <div className="section-icon">💌</div>
                            <h3 className="section-title">The Question</h3>
                            <div className="section-content love-message">{theQuestion}</div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="story-section">
                            <div className="section-icon">💭</div>
                            <h3 className="section-title">A Special {memoryType}</h3>
                            <div className="section-content">{memoryText}</div>
                        </div>
                        <div className="story-section">
                            <div className="section-icon">💖</div>
                            <h3 className="section-title">I Appreciate...</h3>
                            <div className="section-content">
                                {appreciation === 'Other' ? appreciationCustom : appreciation}
                            </div>
                        </div>
                        <div className="story-section">
                            <div className="section-icon">🌍</div>
                            <h3 className="section-title">Our Dream</h3>
                            <div className="section-content love-message">{future}</div>
                        </div>
                    </>
                )}

                <div className="preview-actions">
                    <button className="action-btn edit-btn" onClick={() => navigate(-1)} disabled={isProcessing}>
                        ← Edit Details
                    </button>
                    <button className="action-btn payment-btn" onClick={handleCreate} disabled={isProcessing}>
                        {isProcessing ? statusMessage : "Create My Love Page 💖"}
                    </button>
                </div>
            </div>

            <footer className="compliance-footer">
                <div className="footer-links">
                    <a href="https://wa.me/917907566244" target="_blank" rel="noopener noreferrer">Support</a>
                    <a href="/terms">Terms</a>
                    <a href="/privacy">Privacy</a>
                </div>
                <p>© 2026 Love Journey. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default PreviewPage;