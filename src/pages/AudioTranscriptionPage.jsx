import React from "react";
import AudioTranscriber from "../component/AudioTranscriber";

const AudioTranscriptionPage = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>
        🎤 Audio Transcription Page
      </h1>
      <AudioTranscriber />
    </div>
  );
};

export default AudioTranscriptionPage;
