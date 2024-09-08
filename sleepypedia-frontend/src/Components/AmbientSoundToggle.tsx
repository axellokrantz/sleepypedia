import { useRef, useState, useEffect } from "react";
import FireSound from "../assets/fire-sound.mp3";
import RainSound from "../assets/rain-sound.mp3";

const AmbientSoundToggle = () => {
  const fireAudioRef = useRef<HTMLAudioElement>(null);
  const rainAudioRef = useRef<HTMLAudioElement>(null);
  const [isFirePlaying, setIsFirePlaying] = useState(false);
  const [isRainPlaying, setIsRainPlaying] = useState(false);
  const [fireVolume, setFireVolume] = useState(0.5);
  const [rainVolume, setRainVolume] = useState(0.5);

  useEffect(() => {
    if (fireAudioRef.current) {
      fireAudioRef.current.volume = fireVolume;
    }
  }, [fireVolume]);

  useEffect(() => {
    if (rainAudioRef.current) {
      rainAudioRef.current.volume = rainVolume;
    }
  }, [rainVolume]);

  const toggleFireSound = () => {
    if (fireAudioRef.current) {
      if (isFirePlaying) {
        fireAudioRef.current.pause();
      } else {
        fireAudioRef.current.play();
      }
      setIsFirePlaying(!isFirePlaying);
    }
  };

  const toggleRainSound = () => {
    if (rainAudioRef.current) {
      if (isRainPlaying) {
        rainAudioRef.current.pause();
      } else {
        rainAudioRef.current.play();
      }
      setIsRainPlaying(!isRainPlaying);
    }
  };

  const handleVolumeChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>,
    setVolume: React.Dispatch<React.SetStateAction<number>>
  ) => {
    const target = e.target as HTMLInputElement;
    const newVolume = parseFloat(target.value);
    setVolume(newVolume);
  };

  return (
    <div className="flex flex-col space-y-2 mt-1 pb-2">
      <div className="flex items-center">
        <div className="w-40 flex items-center space-x-2">
          <input
            type="checkbox"
            className={`toggle toggle-sm ${
              isFirePlaying ? "bg-lazy-purple" : "toggle-primary"
            }`}
            checked={isFirePlaying}
            onChange={toggleFireSound}
          />
          <span
            className={`${
              isFirePlaying ? "text-white" : "text-gray-600"
            } transition-colors duration-300`}>
            Campfire
          </span>
        </div>
        <div className="flex-grow">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={fireVolume}
            onChange={(e) => handleVolumeChange(e, setFireVolume)}
            onClick={(e) => handleVolumeChange(e, setFireVolume)}
            className="range range-xs w-full cursor-pointer"
          />
        </div>
        <audio
          ref={fireAudioRef}
          src={FireSound}
          loop
          onEnded={() => fireAudioRef.current?.play()}
        />
      </div>
      <div className="flex items-center">
        <div className="w-40 flex items-center space-x-2">
          <input
            type="checkbox"
            className={`toggle toggle-sm ${
              isRainPlaying ? "bg-lazy-purple" : "toggle-primary"
            }`}
            checked={isRainPlaying}
            onChange={toggleRainSound}
          />
          <span
            className={`${
              isRainPlaying ? "text-white" : "text-gray-600"
            } transition-colors duration-300`}>
            Rain
          </span>
        </div>
        <div className="flex-grow">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={rainVolume}
            onChange={(e) => handleVolumeChange(e, setRainVolume)}
            onClick={(e) => handleVolumeChange(e, setRainVolume)}
            className="range range-xs w-full cursor-pointer"
          />
        </div>
        <audio
          ref={rainAudioRef}
          src={RainSound}
          loop
          onEnded={() => rainAudioRef.current?.play()}
        />
      </div>
    </div>
  );
};

export default AmbientSoundToggle;
