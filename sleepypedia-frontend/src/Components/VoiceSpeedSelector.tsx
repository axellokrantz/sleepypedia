import React, { useState } from "react";
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

interface DropdownProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  disabled: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  value,
  options,
  onChange,
  disabled,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <label className="block mb-2 text-sm font-medium text-gray-500">
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-[#1c1c2d] text-white text-sm rounded-md block w-full p-2.5 text-left appearance-none focus:outline-none"
          disabled={disabled}
        >
          {options.find((option) => option.value === value)?.label || value}
          <RiArrowDownSLine
            size={24}
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          />
        </button>
        {isOpen && !disabled && (
          <div className="absolute z-10 w-full mt-1 bg-[#1c1c2d] border border-gray-700 text-white rounded-md shadow-lg">
            {options.map((option) => (
              <div
                key={option.value}
                className="px-4 py-2 cursor-pointer hover:bg-gray-700"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

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
    <Dropdown
      label="Select a voice"
      value={voice}
      options={[
        { value: "Matthew", label: "Drowsy Dave" },
        { value: "Kendra", label: "Snoozy Suzy" },
      ]}
      onChange={onVoiceChange}
      disabled={isPlaying}
    />
    <Dropdown
      label="Speech Speed"
      value={speed}
      options={[
        { value: "x-slow", label: "Slow" },
        { value: "slow", label: "Normal" },
      ]}
      onChange={onSpeedChange}
      disabled={isPlaying}
    />
    <Dropdown
      label="Volume"
      value={volume}
      options={[
        { value: "x-soft", label: "Soft" },
        { value: "soft", label: "Normal" },
      ]}
      onChange={onVolumeChange}
      disabled={isPlaying}
    />
  </div>
);

export default VoiceSpeedSelector;
