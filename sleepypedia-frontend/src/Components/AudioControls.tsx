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

const AudioControls = ({
  voice,
  speed,
  isPlaying,
  onVoiceChange,
  onSpeedChange,
  onPlay,
  onStop,
  disabled,
}: Props) => (
  <div className="space-y-4">
    <select
      value={voice}
      onChange={(e) => onVoiceChange(e.target.value)}
      className="w-full p-2 border border-gray-300 rounded"
      disabled={isPlaying}>
      <option value="Matthew">Drowsy Dave</option>
      <option value="Kendra">Snoozy Suzy</option>
    </select>
    <div>
      <label htmlFor="speed" className="block mb-1">
        Speech Speed:{" "}
      </label>
      <select
        id="speed"
        value={speed}
        onChange={(e) => onSpeedChange(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
        disabled={isPlaying}>
        <option value="x-slow">Slow</option>
        <option value="slow">Normal</option>
      </select>
    </div>
    <div className="flex justify-between">
      <button
        onClick={onPlay}
        disabled={disabled || isPlaying}
        className={`w-48 p-2 text-white rounded ${
          disabled || isPlaying
            ? "bg-blue-300 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}>
        Play All Articles
      </button>
      <button
        onClick={onStop}
        disabled={!isPlaying}
        className={`w-48 p-2 text-white rounded ${
          !isPlaying
            ? "bg-red-300 cursor-not-allowed"
            : "bg-red-500 hover:bg-red-600"
        }`}>
        Stop
      </button>
    </div>
  </div>
);
export default AudioControls;
