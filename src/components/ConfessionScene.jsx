import PanelVideo from "./PanelVideo";
import ConfessionForm from "./ConfessionForm";

export default function ConfessionScene() {
  return (
    <PanelVideo src="/videos/confess.mp4">
      <ConfessionForm />
    </PanelVideo>
  );
}

