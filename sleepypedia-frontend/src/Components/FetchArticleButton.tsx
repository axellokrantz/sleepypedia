interface Props {
  onClick: () => void;
  isLoading: boolean;
  isPlaying: boolean;
}

const FetchArticleButton = ({ onClick, isLoading, isPlaying }: Props) => (
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
