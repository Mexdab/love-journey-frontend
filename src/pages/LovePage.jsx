import { useState } from "react";
import IntroVideo from "../components/IntroVideo";
import CherryScene from "../components/CherryScene";
import ChoiceScene from "../components/ChoiceScene";
import ConfessionScene from "../components/ConfessionScene";
import LoveScene from "../components/LoveScene";
import BackgroundMusic from "../components/BackgroundMusic";

export default function LovePage() {
  const [scene, setScene] = useState("intro");

  return (
    <div className="scene-wrapper">

      <BackgroundMusic />

      {scene === "intro" && (
        <IntroVideo onNext={() => setScene("cherry")} />
      )}

      {scene === "cherry" && (
        <CherryScene onNext={() => setScene("choice")} />
      )}

      {scene === "choice" && (
        <ChoiceScene
          goToConfess={() => setScene("confess")}
          goToLove={() => setScene("love")}
        />
      )}

      {scene === "confess" && <ConfessionScene />}
      {scene === "love" && <LoveScene />}

    </div>
  );
}


