import { useState, useRef } from "react";
import { Sparkles, Upload, X } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import Navigation

export default function Step8({ form, update, back }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
            update("photos", [file]); // Store file for backend
        }
    };

    const handleRemovePhoto = (e) => {
        e.stopPropagation();
        setPreview(null);
        update("photos", []);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleGenerate = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);

            // 🚀 MASTER MAPPING: Send raw data to the Master Schema
            const formattedData = {
                pageType: 'relationship',

                // Identity
                relationshipStatus: form.relationship,
                yourName: form.yourName || "Me",
                showYourName: form.showYourName,
                partnerName: form.partnerName,

                // The Heart of the Letter
                feelings: form.feelings,

                // Memory Section
                memoryEnabled: form.memoryEnabled,
                memoryType: form.memoryType,
                memoryText: form.memoryText,

                // Appreciation & Future
                appreciation: form.appreciation,
                appreciationCustom: form.appreciationCustom,
                future: form.future,
                tone: form.tone,

                // Media
                photos: form.photos || []
            };

            navigate("/preview", { state: formattedData });
        }, 1500);
    };

    return (
        <div className="fade-in-up">
            <h2 className="main-title">Add a Special Moment</h2>
            <p className="subtitle">Optional: Upload a photo</p>

            <div
                className="glass-box"
                style={{ padding: "40px", marginTop: "20px", cursor: "pointer", borderStyle: "dashed", borderWidth: "2px", borderColor: "rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.02)", maxWidth: "500px", marginLeft: "auto", marginRight: "auto", display: "flex", flexDirection: "column", justifyContent: "center", minHeight: "300px" }}
                onClick={() => fileInputRef.current.click()}
            >
                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" style={{ display: "none" }} />

                {preview ? (
                    <div style={{ position: "relative", width: "100%", height: "200px" }}>
                        <img src={preview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "16px" }} />
                        <div onClick={handleRemovePhoto} style={{ position: "absolute", top: -10, right: -10, background: "#ff3e6c", borderRadius: "50%", padding: "8px" }}><X size={16} color="white" /></div>
                    </div>
                ) : (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", color: "rgba(255,255,255,0.6)" }}>
                        <Upload size={48} /><span>Click to upload image</span>
                    </div>
                )}
            </div>

            <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "40px" }}>
                <button className="nav-btn" onClick={back}>Back</button>
                <button className="glow-btn" onClick={handleGenerate} disabled={loading}>
                    {loading ? <><Sparkles className="spin" size={18} style={{ marginRight: 8 }} /> Creating Magic...</> : preview ? "Generate with Photo 📸" : "Skip & Generate ✨"}
                </button>
            </div>
        </div>
    );
}