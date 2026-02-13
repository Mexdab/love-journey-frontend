import { useLocation, useNavigate } from "react-router-dom";

export default function Preview() {
  const { state } = useLocation();
  const nav = useNavigate();

  if (!state) return <div>No data</div>;

  return (
    <div className="center">
      <h2>Preview</h2>

      <p>
        {state.yourName} ❤️ {state.partnerName}
      </p>

      <button onClick={() => nav("/love/demo")}>Open Love Page</button>
    </div>
  );
}
