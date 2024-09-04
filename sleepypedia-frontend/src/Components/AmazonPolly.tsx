import React, { useState } from "react";

const AmazonPollyComponent: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleTextToSpeech = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://localhost:5148/api/TextToSpeech/convert",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to convert text to speech");
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      const audio = new Audio(audioUrl);
      audio.play();
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to convert text to speech");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h2>Amazon Polly Text-to-Speech</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to convert to speech"
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          minHeight: "100px",
        }}
      />
      <button
        onClick={handleTextToSpeech}
        disabled={isLoading}
        style={{ width: "100%", padding: "10px" }}>
        {isLoading ? "Converting..." : "Convert to Speech"}
      </button>
    </div>
  );
};

export default AmazonPollyComponent;
