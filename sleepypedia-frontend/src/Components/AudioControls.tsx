import React from "react";
import VoiceSpeedSelector from "./VoiceSpeedSelector";

interface Props {
  voice: string;
  speed: string;
  isPlaying: boolean;
  onVoiceChange: (voice: string) => void;
  onSpeedChange: (speed: string) => void;
  onPlay: () => void;
  onStop: () => void;
  disabled: boolean;
}

const AudioControls: React.FC<Props> = ({
  voice,
  speed,
  isPlaying,
  onVoiceChange,
  onSpeedChange,
  onPlay,
  onStop,
  disabled,
}: Props) => (
  <div className="space-y-4 font-figtree w-full">
    <VoiceSpeedSelector
      voice={voice}
      speed={speed}
      isPlaying={isPlaying}
      onVoiceChange={onVoiceChange}
      onSpeedChange={onSpeedChange}
    />
    <div className="flex flex-col sm:flex-row sm:space-x-4">
      <button
        onClick={onPlay}
        disabled={disabled || isPlaying}
        className={`
          w-full sm:w-1/4 p-2.5 text-sm font-medium rounded-lg mb-2 sm:mb-0
          ${
            disabled || isPlaying
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : "bg-yellow-200 text-black hover:bg-yellow-300 focus:ring-4 focus:outline-none focus:ring-yellow-300"
          }
        `}>
        Play All Articles
      </button>
      <button
        onClick={onStop}
        disabled={!isPlaying}
        className={`
          w-full sm:w-1/4 p-2.5 text-sm font-medium rounded-lg
          ${
            !isPlaying
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : "bg-red-600 text-white hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300"
          }
        `}>
        Stop
      </button>
    </div>
  </div>
);

export default AudioControls;
