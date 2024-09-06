import React from "react";
import { RiArrowDownSLine } from "react-icons/ri";

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
    <div className="flex flex-col sm:flex-row sm:space-x-4">
      <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
        <label
          htmlFor="voice"
          className="block mb-2 text-sm font-medium text-white">
          Select a voice
        </label>
        <div className="relative">
          <select
            id="voice"
            value={voice}
            onChange={(e) => onVoiceChange(e.target.value)}
            className="bg-[#1c1c2d] text-white text-sm rounded-lg block w-full p-2.5 appearance-none"
            disabled={isPlaying}>
            <option value="Matthew">Drowsy Dave</option>
            <option value="Kendra">Snoozy Suzy</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-white">
            <RiArrowDownSLine size={24} />
          </div>
        </div>
      </div>
      <div className="w-full sm:w-1/2">
        <label
          htmlFor="speed"
          className="block mb-2 text-sm font-medium text-white">
          Speech Speed
        </label>
        <div className="relative">
          <select
            id="speed"
            value={speed}
            onChange={(e) => onSpeedChange(e.target.value)}
            className="bg-[#1c1c2d] text-white text-sm rounded-lg block w-full p-2.5 appearance-none"
            disabled={isPlaying}>
            <option value="x-slow">Slow</option>
            <option value="slow">Normal</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-white">
            <RiArrowDownSLine size={24} />
          </div>
        </div>
      </div>
    </div>
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
