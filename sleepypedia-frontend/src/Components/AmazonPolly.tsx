import React, { useState, useRef } from "react";
import ArticleList from "./ArticleList";
import ArticleContent from "./ArticleContent";
import AudioControls from "./AudioControls";
import FetchArticleButton from "./FetchArticleButton";

interface WikipediaArticle {
  id: number;
  title: string;
  content: string;
}

const AmazonPollyComponent: React.FC = () => {
  const [articles, setArticles] = useState<WikipediaArticle[]>([]);
  const [selectedArticle, setSelectedArticle] =
    useState<WikipediaArticle | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [voice, setVoice] = useState<string>("Matthew");
  const [speed, setSpeed] = useState<string>("slow");
  const [error, setError] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement>(new Audio());
  const currentArticleIndex = useRef(0);

  const fetchRandomWikipediaArticle = async () => {
    if (isPlaying) return;

    setIsLoading(true);
    setError(null);
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
      setSelectedArticle(newArticle);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to fetch random Wikipedia article");
    } finally {
      setIsLoading(false);
    }
  };

  const removeArticle = (id: number) => {
    if (isPlaying) return;
    setArticles((prevArticles) =>
      prevArticles.filter((article) => article.id !== id)
    );
    if (selectedArticle?.id === id) {
      setSelectedArticle(null);
    }
  };

  const playArticles = async () => {
    setIsPlaying(true);
    currentArticleIndex.current = 0;
    setError(null);
    await playNextArticle();
  };

  const playNextArticle = async () => {
    if (currentArticleIndex.current >= articles.length) {
      setIsPlaying(false);
      return;
    }

    const article = articles[currentArticleIndex.current];
    setSelectedArticle(article);
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
      setError("Failed to convert text to speech. Please try again.");
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
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">
        Amazon Polly Text-to-Speech with Wikipedia Articles
      </h2>
      <FetchArticleButton
        onClick={fetchRandomWikipediaArticle}
        isLoading={isLoading}
        isPlaying={isPlaying}
      />
      <div className="flex mb-6">
        <ArticleList
          articles={articles}
          selectedArticle={selectedArticle}
          onSelectArticle={setSelectedArticle}
          onRemoveArticle={removeArticle}
          isPlaying={isPlaying}
        />
        <ArticleContent content={selectedArticle?.content ?? null} />
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
      {error && <div className="text-red-500 mt-4">{error}</div>}
    </div>
  );
};

export default AmazonPollyComponent;
