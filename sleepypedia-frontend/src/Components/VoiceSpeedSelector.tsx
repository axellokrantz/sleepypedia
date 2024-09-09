import React from "react";
import { RiArrowDownSLine } from "react-icons/ri";

interface VoiceSpeedSelectorProps {
  voice: string;
  speed: string;
  volume: string;
  isPlaying: boolean;
  onVoiceChange: (voice: string) => void;
  onSpeedChange: (speed: string) => void;
  onVolumeChange: (volume: string) => void;
}

const VoiceSpeedSelector: React.FC<VoiceSpeedSelectorProps> = ({
  voice,
  speed,
  volume,
  isPlaying,
  onVoiceChange,
  onSpeedChange,
  onVolumeChange,
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    <div className="w-full">
      <label
        htmlFor="voice"
        className="block mb-2 text-sm font-medium text-gray-500"
      >
        Select a voice
      </label>
      <div className="relative">
        <select
          id="voice"
          value={voice}
          onChange={(e) => onVoiceChange(e.target.value)}
          className="bg-[#1c1c2d] text-white text-sm rounded-md block w-full p-2.5 appearance-none"
          disabled={isPlaying}
        >
          <option value="Matthew">Drowsy Dave</option>
          <option value="Kendra">Snoozy Suzy</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-white">
          <RiArrowDownSLine size={24} />
        </div>
      </div>
    </div>
    <div className="w-full">
      <label
        htmlFor="speed"
        className="block mb-2 text-sm font-medium text-gray-500"
      >
        Speech Speed
      </label>
      <div className="relative">
        <select
          id="speed"
          value={speed}
          onChange={(e) => onSpeedChange(e.target.value)}
          className="bg-[#1c1c2d] text-white text-sm rounded-md block w-full p-2.5 appearance-none"
          disabled={isPlaying}
        >
          <option value="x-slow">Slow</option>
          <option value="slow">Normal</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-white">
          <RiArrowDownSLine size={24} />
        </div>
      </div>
    </div>
    <div className="w-full">
      <label
        htmlFor="volume"
        className="block mb-2 text-sm font-medium text-gray-500"
      >
        Volume
      </label>
      <div className="relative">
        <select
          id="volume"
          value={volume}
          onChange={(e) => onVolumeChange(e.target.value)}
          className="bg-[#1c1c2d] text-white text-sm rounded-md block w-full p-2.5 appearance-none"
          disabled={isPlaying}
        >
          <option value="x-soft">Very Soft</option>
          <option value="soft">Soft</option>
          <option value="medium">Medium</option>
          <option value="loud">Loud</option>
          <option value="x-loud">Very Loud</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-white">
          <RiArrowDownSLine size={24} />
        </div>
      </div>
    </div>
  </div>
);

export default VoiceSpeedSelector;
