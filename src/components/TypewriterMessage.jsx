import { Typewriter } from "react-simple-typewriter";

export default function TypewriterMessage({ text }) {
  return (
    <div className="center">
      <h2>
        <Typewriter words={[text]} loop={1} cursor />
      </h2>
    </div>
  );
}
