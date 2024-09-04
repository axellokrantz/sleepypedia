import { useState } from "react";

const AmazonPollyComponent = () => {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTextToSpeech = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5148/api/TextToSpeech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Failed to convert text to speech");
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      const audio = new Audio(audioUrl);
      audio.play();
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to convert text to speech: ");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h2>Amazon Polly Text-to-Speech</h2>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to convert to speech"
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />
      <button
        onClick={handleTextToSpeech}
        disabled={isLoading}
        style={{ width: "100%", padding: "10px" }}
      >
        {isLoading ? "Converting..." : "Convert to Speech"}
      </button>
    </div>
  );
};

export default AmazonPollyComponent;
