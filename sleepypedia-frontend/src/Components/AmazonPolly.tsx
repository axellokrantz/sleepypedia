import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import WikipediaArticleAccordion from "./WikipediaArticleAccordion";
import AudioControls from "./AudioControls";
import FetchArticleButton from "./FetchArticleButton";
import { Bs1Circle, Bs2Circle, Bs3Circle } from "react-icons/bs";

interface WikipediaArticle {
  id: number;
  title: string;
  content: string;
}

const AmazonPolly = () => {
  const queryClient = useQueryClient();
  const [isPlaying, setIsPlaying] = useState(false);
  const [voice, setVoice] = useState<string>("Matthew");
  const [speed, setSpeed] = useState<string>("slow");

  const audioRef = useRef<HTMLAudioElement>(new Audio());
  const currentArticleIndex = useRef(0);

  const { data: articles = [], isLoading: isLoadingArticles } = useQuery<
    WikipediaArticle[]
  >({
    queryKey: ["articles"],
    queryFn: () =>
      fetch("http://localhost:5148/api/TextToSpeech/articles").then((res) =>
        res.json()
      ),
  });

  const fetchRandomArticleMutation = useMutation({
    mutationFn: () =>
      fetch("http://localhost:5148/api/TextToSpeech/random-wikipedia").then(
        (res) => res.json()
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });

  const removeArticleMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(
        `http://localhost:5148/api/TextToSpeech/article/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Article not found");
        }
        throw new Error("Failed to delete article");
      }
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
    onError: (error) => {
      console.error("Error deleting article:", error);
    },
  });

  const handleRemoveArticle = async (id: number) => {
    console.log("Attempting to delete article with ID:", id); // New console log
    try {
      await removeArticleMutation.mutateAsync(id);
      console.log("Article successfully deleted"); // New console log
    } catch (error) {
      console.error("Failed to remove article:", error);
      // You could add a toast notification here to inform the user
    }
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
      {isLoadingArticles ? (
        <div className="text-white">Loading articles...</div>
      ) : (
        <>
          <div className="space-y-4">
            <div className="text-white text-base">
              <Bs1Circle className="inline-block mr-2" />
              <span>
                Fetch random Wikipedia articles to add to your playlist.
              </span>
            </div>
            <FetchArticleButton
              onClick={() => fetchRandomArticleMutation.mutate()}
              isLoading={fetchRandomArticleMutation.isPending}
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
              onRemoveArticle={handleRemoveArticle}
              isPlaying={isPlaying}
              isRemoving={removeArticleMutation.isPending}
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
        </>
      )}
    </div>
  );
};

export default AmazonPolly;
