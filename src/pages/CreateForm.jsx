import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateForm() {
  const nav = useNavigate();

  const [data, setData] = useState({
    relationship: "",
    yourName: "",
    partnerName: "",
  });

  const handleNext = () => {
    nav("/preview", { state: data });
  };

  return (
    <div className="center">
      <h2>Step 1</h2>

      <select
        onChange={(e) => setData({ ...data, relationship: e.target.value })}
      >
        <option>Dating</option>
        <option>In a relationship</option>
        <option>Engaged</option>
        <option>Married</option>
        <option>It’s complicated 😅</option>
      </select>

      <input
        placeholder="Your Name"
        onChange={(e) => setData({ ...data, yourName: e.target.value })}
      />

      <input
        placeholder="Partner Name"
        onChange={(e) => setData({ ...data, partnerName: e.target.value })}
      />

      <button onClick={handleNext}>Continue</button>
    </div>
  );
}
