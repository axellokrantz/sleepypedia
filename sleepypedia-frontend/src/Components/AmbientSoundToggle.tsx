import { useRef, useState, useEffect } from "react";
import FireSound from "../assets/fire-sound.mp3";

const AmbientSoundToggle = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const toggleSound = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  return (
    <div className="flex items-center space-x-2 mt-1">
      <input
        type="checkbox"
        className={`toggle toggle-sm ${
          isPlaying ? "bg-lazy-purple" : "toggle-primary"
        }`}
        checked={isPlaying}
        onChange={toggleSound}
      />
      <span
        className={`${
          isPlaying ? "text-white" : "text-gray-600"
        } transition-colors duration-300`}>
        Campfire
      </span>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
        className="range range-xs range-warning"
      />
      <audio
        ref={audioRef}
        src={FireSound}
        loop
        onEnded={() => audioRef.current?.play()}
      />
    </div>
  );
};

export default AmbientSoundToggle;
