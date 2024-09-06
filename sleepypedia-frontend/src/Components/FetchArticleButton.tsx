import React, { useState } from "react";
import wikipediaIconYellow from "../assets/icons/wikipedia-icon-yellow.png";
import wikipediaIconBlack from "../assets/icons/wikipedia-icon-black.png";

interface Props {
  onClick: () => void;
  isLoading: boolean;
  isPlaying: boolean;
}

const FetchArticleButton: React.FC<Props> = ({
  onClick,
  isLoading,
  isPlaying,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      disabled={isLoading || isPlaying}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        font-figtree text-sm bg-transparent 
        hover:bg-yellow-200 text-yellow-200 hover:text-black 
        py-2 px-4 border border-yellow-200 hover:border-transparent rounded
        flex items-center justify-center w-full mb-4
        ${
          isLoading || isPlaying
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-yellow-200"
        }
      `}>
      <img
        src={isHovered ? wikipediaIconBlack : wikipediaIconYellow}
        alt="Wikipedia icon"
        className="w-5 h-5 mr-2"
      />
      {isLoading ? "Fetching..." : "Fetch Random Wikipedia Article"}
    </button>
  );
};

export default FetchArticleButton;
