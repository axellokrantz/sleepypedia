import React from "react";

interface FetchArticleButtonProps {
  onClick: () => void;
  isLoading: boolean;
  isPlaying: boolean;
}

const FetchArticleButton: React.FC<FetchArticleButtonProps> = ({
  onClick,
  isLoading,
  isPlaying,
}) => (
  <button
    onClick={onClick}
    disabled={isLoading || isPlaying}
    className={`w-full p-2 mb-4 text-white rounded ${
      isLoading || isPlaying
        ? "bg-gray-300 cursor-not-allowed"
        : "bg-green-500 hover:bg-green-600"
    }`}>
    {isLoading ? "Fetching..." : "Fetch Random Wikipedia Article"}
  </button>
);

export default FetchArticleButton;
