import React, { useState } from "react"; // Explicit import to prevent Vercel build errors
import { useNavigate } from "react-router-dom";

export default function CreateForm() {
  const nav = useNavigate();

  // 🔄 Simplified state without the photos array
  const [data, setData] = useState({
    relationship: "Dating",
    yourName: "",
    partnerName: "",
  });

  const handleNext = () => {
    // 🚀 Navigates to preview with just text data
    nav("/preview", { state: data });
  };

  return (
    <div className="center">
      <h2>Step 1: The Basics</h2>

      <div className="form-group">
        <label>Your Relationship</label>
        <select
          value={data.relationship}
          onChange={(e) => setData({ ...data, relationship: e.target.value })}
        >
          <option value="Dating">Dating</option>
          <option value="In a relationship">In a relationship</option>
          <option value="Engaged">Engaged</option>
          <option value="Married">Married</option>
          <option value="It’s complicated 😅">It’s complicated 😅</option>
        </select>
      </div>

      <div className="form-group">
        <input
          type="text"
          placeholder="Your Name"
          value={data.yourName}
          onChange={(e) => setData({ ...data, yourName: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          placeholder="Partner Name"
          value={data.partnerName}
          onChange={(e) => setData({ ...data, partnerName: e.target.value })}
          required
        />
      </div>

      <button className="submit-btn" onClick={handleNext}>
        Continue to Preview
      </button>
    </div>
  );
}