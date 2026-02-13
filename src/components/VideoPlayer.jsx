import { useState } from "react";

export default function VideoPlayer() {
  const [videoURL, setVideoURL] = useState(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoURL(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleFile} />

      {videoURL && (
        <video
          src={videoURL}
          autoPlay
          controls
          style={{ width: "100%" }}
        />
      )}
    </div>
  );
}
