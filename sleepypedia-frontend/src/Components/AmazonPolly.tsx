import React, { useState, useRef } from "react";
import WikipediaArticleAccordion from "./WikipediaArticleAccordion";
import AudioControls from "./AudioControls";
import FetchArticleButton from "./FetchArticleButton";
import { Bs1Circle } from "react-icons/bs";
import { Bs2Circle } from "react-icons/bs";
import { Bs3Circle } from "react-icons/bs";

interface WikipediaArticle {
  id: number;
  title: string;
  content: string;
}

const AmazonPolly: React.FC = () => {
  const [articles, setArticles] = useState<WikipediaArticle[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [voice, setVoice] = useState<string>("Matthew");
  const [speed, setSpeed] = useState<string>("slow");

  const audioRef = useRef<HTMLAudioElement>(new Audio());
  const currentArticleIndex = useRef(0);

  const fetchRandomWikipediaArticle = async () => {
    if (isPlaying) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        "http://localhost:5148/api/TextToSpeech/random-wikipedia"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch random Wikipedia article");
      }
      const data: Omit<WikipediaArticle, "id"> = await response.json();
      const newArticle: WikipediaArticle = {
        ...data,
        id: Date.now(),
      };
      setArticles((prevArticles) => [...prevArticles, newArticle]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeArticle = (id: number) => {
    if (isPlaying) return;
    setArticles((prevArticles) =>
      prevArticles.filter((article) => article.id !== id)
    );
  };

  const playArticles = async () => {
    setIsPlaying(true);
    currentArticleIndex.current = 0;
    await playNextArticle();
  };

  const playNextArticle = async () => {
    if (currentArticleIndex.current >= articles.length) {
      setIsPlaying(false);
      return;
    }

    const article = articles[currentArticleIndex.current];
    try {
      const response = await fetch(
        "http://localhost:5148/api/TextToSpeech/convert",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: article.content, voice, speed }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to convert text to speech: ${response.statusText}`
        );
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      audioRef.current.src = audioUrl;
      audioRef.current.onended = () => {
        currentArticleIndex.current++;
        playNextArticle();
      };
      audioRef.current.play();
    } catch (error) {
      console.error("Error:", error);
      setIsPlaying(false);
    }
  };

  const stopPlayback = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
    currentArticleIndex.current = 0;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <div className="space-y-4">
        <div className="text-white text-base">
          <Bs1Circle className="inline-block mr-2" />
          <span>Fetch random Wikipedia articles to add to your playlist.</span>
        </div>
        <FetchArticleButton
          onClick={fetchRandomWikipediaArticle}
          isLoading={isLoading}
          isPlaying={isPlaying}
        />
      </div>
      <div className="space-y-4">
        <div className="text-white text-base">
          <Bs2Circle className="inline-block mr-2" />
          <span>
            Browse through your article playlist. Expand to read content or
            remove unwanted articles.
          </span>
        </div>
        <WikipediaArticleAccordion
          articles={articles}
          onRemoveArticle={removeArticle}
          isPlaying={isPlaying}
        />
      </div>
      <div className="text-white text-base">
        <Bs3Circle className="inline-block mr-2" />
        <span>Pick a voice and voice speed for the narration.</span>
      </div>
      <AudioControls
        voice={voice}
        speed={speed}
        isPlaying={isPlaying}
        onVoiceChange={setVoice}
        onSpeedChange={setSpeed}
        onPlay={playArticles}
        onStop={stopPlayback}
        disabled={articles.length === 0}
      />
    </div>
  );
};

export default AmazonPolly;
