import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import WikipediaArticleAccordion from "./WikipediaArticleAccordion";
import AudioControls from "./AudioControls";
import FetchArticleButton from "./FetchArticleButton";
import { Bs1Circle, Bs2Circle, Bs3Circle, Bs4Circle } from "react-icons/bs";
import { useAudioPlayback } from "../hooks/useAudioPlayback";
import AmbientSoundToggle from "./AmbientSoundToggle";
import Footer from "./Footer";

interface WikipediaArticle {
  id: number;
  title: string;
  content: string;
}

const AmazonPolly = () => {
  const queryClient = useQueryClient();
  const initialVoice = "Matthew";
  const initialSpeed = "slow";
  const initialVolume = "medium";

  const { data: articles = [], isLoading: isLoadingArticles } = useQuery<
    WikipediaArticle[]
  >({
    queryKey: ["articles"],
    queryFn: () =>
      fetch("http://localhost:5148/api/TextToSpeech/articles").then((res) =>
        res.json()
      ),
  });

  const {
    isPlaying,
    voice,
    speed,
    volume,
    playArticles,
    stopPlayback,
    setVoice,
    setSpeed,
    setVolume,
  } = useAudioPlayback(articles, initialVoice, initialSpeed, initialVolume);

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
    mutationFn: (id: number) =>
      fetch(`http://localhost:5148/api/TextToSpeech/article/${id}`, {
        method: "DELETE",
      }).then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete article");
        }
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      {isLoadingArticles ? (
        <div className="text-white">Loading articles...</div>
      ) : (
        <>
          <h1 className="mb-8 font-linux flex justify-center">
            <span className=" text-4xl font-medium text-lazy-purple text-center">
              Sleepypedia
              <span className="text-xxs align-super text-white">TM</span>
              <span className="text-white text-4xl font-medium">
                {" "}
                Playlist Creator
              </span>
            </span>
          </h1>
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
              onRemoveArticle={(id) => removeArticleMutation.mutate(id)}
              isPlaying={isPlaying}
              isRemoving={removeArticleMutation.isPending}
            />
          </div>
          <div className="text-white text-base">
            <Bs3Circle className="inline-block mr-2" />
            <span>Toggle ambience sounds for a cozy atmosphere.</span>
          </div>
          <AmbientSoundToggle />
          <div className="text-white text-base">
            <Bs4Circle className="inline-block mr-2" />
            <span>Pick a voice, speed, and volume for the narration.</span>
          </div>
          <AudioControls
            voice={voice}
            speed={speed}
            volume={volume}
            isPlaying={isPlaying}
            onVoiceChange={setVoice}
            onSpeedChange={setSpeed}
            onVolumeChange={setVolume}
            onPlay={playArticles}
            onStop={stopPlayback}
            disabled={articles.length === 0}
          />
          <Footer />
        </>
      )}
    </div>
  );
};

export default AmazonPolly;
