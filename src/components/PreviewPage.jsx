import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PreviewPage.css';

// 🛠️ FIX 1: Point directly to Render (No more Localhost)
const API_BASE_URL = "https://love-journey-backend-eqyf.onrender.com";

const PreviewPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // 1. Get ALL data passed from the Form
    const formDataRaw = location.state || {};

    const [isProcessing, setIsProcessing] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");

    // 2. Destructure for Preview Display
    const {
        yourName = "Admirer",
        partnerName = "My Love",
        pageType = "relationship",
        theme = "romantic",
        photos = [],
        // Confession Fields
        feelingsStart,
        admireMost,
        theQuestion,
        // Relationship Fields
        memoryType,
        memoryText,
        future,
        appreciation,
        appreciationCustom
    } = formDataRaw;

    useEffect(() => {
        if (!window.Razorpay) {
            console.error("Razorpay SDK not loaded. Add script to index.html");
        }
    }, []);

    const uploadImagesToBackend = async (imageFiles) => {
        if (!imageFiles || imageFiles.length === 0) return [];
        const uploadData = new FormData();
        const filesArray = Array.isArray(imageFiles) ? imageFiles : [imageFiles];
        filesArray.forEach(file => uploadData.append('photos', file));

        const res = await fetch(`${API_BASE_URL}/api/love/upload-images`, {
            method: 'POST',
            body: uploadData
        });

        if (!res.ok) throw new Error("Image upload failed");
        const data = await res.json();
        return data.photos;
    };

    const handlePayment = async () => {
        if (!window.Razorpay) {
            alert("Payment system loading... please wait or refresh.");
            return;
        }

        setIsProcessing(true);
        setStatusMessage("Uploading your memories... 📸");

        try {
            let uploadedPhotos = [];
            if (photos && photos.length > 0) {
                uploadedPhotos = await uploadImagesToBackend(photos);
            }

            setStatusMessage("Initializing Secure Payment... 💳");

            const orderRes = await fetch(`${API_BASE_URL}/api/payment/create-order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: 10 })
            });

            if (!orderRes.ok) throw new Error("Order creation failed");
            const orderData = await orderRes.json();

            // 🛠️ FIX 2: Use the Environment Variable for the Key (or paste your rzp_live_ key here)
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Ensure this is set in Vercel!
                amount: orderData.order.amount,
                currency: orderData.order.currency,
                name: "Love Journey",
                description: `For ${partnerName}`,
                order_id: orderData.order.id,

                handler: async function (response) {
                    setStatusMessage("Creating Page... ✨");
                    try {
                        const verifyPayload = {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            formData: {
                                ...formDataRaw,
                                photos: uploadedPhotos
                            }
                        };

                        const verifyRes = await fetch(`${API_BASE_URL}/api/payment/verify`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(verifyPayload)
                        });

                        const verifyData = await verifyRes.json();
                        if (verifyData.success) {
                            navigate('/success', { state: { slug: verifyData.slug } });
                        } else {
                            alert("Verification failed: " + verifyData.message);
                            setIsProcessing(false);
                        }
                    } catch (err) {
                        console.error(err);
                        alert("Error saving your page. Contact support.");
                        setIsProcessing(false);
                    }
                },
                theme: { color: "#E11D48" },
                modal: { ondismiss: () => setIsProcessing(false) }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (error) {
            console.error(error);
            alert("Error: " + error.message);
            setIsProcessing(false);
        }
    };

    return (
        <div className={`preview-page theme-${theme.toLowerCase()}`}>
            <div className="payment-banner">
                🔒 Preview Mode. Pay ₹10 to unlock the full cinematic experience.
            </div>

            <div className="preview-container">
                <header className="preview-header">
                    <h1 className="preview-title">A Preview of Your Journey</h1>
                    <div className="partner-name">{partnerName}</div>
                    <div className="from-text">From {yourName}</div>
                </header>

                {pageType === 'confession' ? (
                    // 💔 SINGLE / CONFESSION FLOW
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
                    // ❤️ IN LOVE / RELATIONSHIP FLOW
                    <>
                        <div className="story-section">
                            <div className="section-icon">📸</div>
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
                    <button className="action-btn payment-btn" onClick={handlePayment} disabled={isProcessing}>
                        {isProcessing ? statusMessage : "Pay ₹10 to Create 💖"}
                    </button>
                </div>
            </div>

            <footer className="compliance-footer">
                <div className="footer-links">
                    <a href="https://wa.me/917907566244" target="_blank" rel="noopener noreferrer">Contact Us</a>
                    <a href="/terms">Terms & Conditions</a>
                    <a href="/privacy">Privacy Policy</a>
                    <a href="/refund">Refund Policy</a>
                </div>
                <p>© 2026 Love Journey. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default PreviewPage;