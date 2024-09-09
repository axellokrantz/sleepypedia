import React, { useRef, useState, useEffect } from "react";
import FireSound from "../assets/fire-sound.mp3";
import RainSound from "../assets/rain-sound.mp3";
import AmbientSound from "../assets/ambient-sound.mp3";

const AmbientSoundToggle: React.FC = () => {
  const fireAudioRef = useRef<HTMLAudioElement>(null);
  const rainAudioRef = useRef<HTMLAudioElement>(null);
  const ambientAudioRef = useRef<HTMLAudioElement>(null);
  const [isFirePlaying, setIsFirePlaying] = useState(false);
  const [isRainPlaying, setIsRainPlaying] = useState(false);
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(false);
  const [fireVolume, setFireVolume] = useState(0.5);
  const [rainVolume, setRainVolume] = useState(0.5);
  const [ambientVolume, setAmbientVolume] = useState(0.5);

  const FIRE_VOLUME_REDUCTION = 0.5;
  const RAIN_VOLUME_BOOST = 1.2;
  const AMBIENT_VOLUME_ADJUSTMENT = 0.5;

  useEffect(() => {
    if (fireAudioRef.current) {
      fireAudioRef.current.volume = fireVolume * FIRE_VOLUME_REDUCTION;
    }
  }, [fireVolume]);

  useEffect(() => {
    if (rainAudioRef.current) {
      rainAudioRef.current.volume = Math.min(rainVolume * RAIN_VOLUME_BOOST, 1);
    }
  }, [rainVolume]);

  useEffect(() => {
    if (ambientAudioRef.current) {
      ambientAudioRef.current.volume = Math.min(
        ambientVolume * AMBIENT_VOLUME_ADJUSTMENT,
        1
      );
    }
  }, [ambientVolume]);

  const toggleSound = (
    audioRef: React.RefObject<HTMLAudioElement>,
    isPlaying: boolean,
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
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

  const renderSoundToggle = (
    name: string,
    isPlaying: boolean,
    toggleFunction: () => void,
    volume: number,
    setVolume: React.Dispatch<React.SetStateAction<number>>,
    audioRef: React.RefObject<HTMLAudioElement>,
    audioSrc: string
  ) => (
    <div className="flex items-center">
      <div className="w-40 flex items-center space-x-2">
        <input
          type="checkbox"
          className={`toggle toggle-sm ${
            isPlaying ? "bg-lazy-purple" : "toggle-primary"
          }`}
          checked={isPlaying}
          onChange={toggleFunction}
        />
        <span
          className={`${
            isPlaying ? "text-white" : "text-gray-600"
          } transition-colors duration-300`}
        >
          {name}
        </span>
      </div>
      <div className="flex-grow">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => handleVolumeChange(e, setVolume)}
          onClick={(e) => handleVolumeChange(e, setVolume)}
          className="range range-xs w-full cursor-pointer"
        />
      </div>
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        onEnded={() => audioRef.current?.play()}
      />
    </div>
  );

  return (
    <div className="flex flex-col space-y-2 mt-1 pb-2">
      {renderSoundToggle(
        "Campfire",
        isFirePlaying,
        () => toggleSound(fireAudioRef, isFirePlaying, setIsFirePlaying),
        fireVolume,
        setFireVolume,
        fireAudioRef,
        FireSound
      )}
      {renderSoundToggle(
        "Rain",
        isRainPlaying,
        () => toggleSound(rainAudioRef, isRainPlaying, setIsRainPlaying),
        rainVolume,
        setRainVolume,
        rainAudioRef,
        RainSound
      )}
      {renderSoundToggle(
        "Ambient",
        isAmbientPlaying,
        () =>
          toggleSound(ambientAudioRef, isAmbientPlaying, setIsAmbientPlaying),
        ambientVolume,
        setAmbientVolume,
        ambientAudioRef,
        AmbientSound
      )}
    </div>
  );
};

export default AmbientSoundToggle;
