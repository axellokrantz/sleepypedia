import { useState, useRef, useCallback, useEffect } from "react";

interface WikipediaArticle {
  id: number;
  title: string;
  content: string;
}

export const useAudioPlayback = (
  articles: WikipediaArticle[],
  initialVoice: string,
  initialSpeed: string
) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [voice, setVoice] = useState(initialVoice);
  const [speed, setSpeed] = useState(initialSpeed);
  const audioRef = useRef<HTMLAudioElement>(new Audio());
  const currentArticleIndex = useRef(0);

  const playNextArticleRef = useRef<() => Promise<void>>();

  const playNextArticle = useCallback(async () => {
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
        playNextArticleRef.current?.();
      };
      audioRef.current.play();
    } catch (error) {
      console.error("Error:", error);
      setIsPlaying(false);
    }
  }, [articles, voice, speed]);

  useEffect(() => {
    playNextArticleRef.current = playNextArticle;
  }, [playNextArticle]);

  const playArticles = useCallback(async () => {
    setIsPlaying(true);
    currentArticleIndex.current = 0;
    await playNextArticleRef.current?.();
  }, []);

  const stopPlayback = useCallback(() => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
    currentArticleIndex.current = 0;
  }, []);

  return {
    isPlaying,
    voice,
    speed,
    playArticles,
    stopPlayback,
    setVoice,
    setSpeed,
  };
};
