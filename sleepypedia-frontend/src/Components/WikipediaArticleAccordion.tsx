import React, { useState } from "react";
import CrossIcon from "../assets/Icons/CrossIcon";

interface WikipediaArticle {
  id: number;
  title: string;
  content: string;
}

interface Props {
  articles: WikipediaArticle[];
  onRemoveArticle: (id: number) => void;
  isPlaying: boolean;
}

const WikipediaArticleAccordion: React.FC<Props> = ({
  articles,
  onRemoveArticle,
  isPlaying,
}) => {
  const [openArticleId, setOpenArticleId] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setOpenArticleId(openArticleId === id ? null : id);
  };

  return (
    <div className="w-full font-figtree">
      <h3 className="text-lg font-linux mb-2">Article Playlist</h3>
      <div className="join join-vertical w-full">
        {articles.map((article) => (
          <div key={article.id} className="rounded-lg mb-2 overflow-hidden">
            <div className="flex items-center bg-[#1c1c2d] h-11">
              <button
                onClick={() => onRemoveArticle(article.id)}
                disabled={isPlaying}
                className={`btn btn-ghost btn-sm p-0 hover:bg-transparent h-11 w-11 flex items-center justify-center ${
                  isPlaying
                    ? "opacity-50 cursor-not-allowed"
                    : "text-white hover:text-gray-600"
                }`}>
                <CrossIcon />
              </button>
              <div className={`collapse collapse-arrow flex-grow`}>
                <input
                  type="checkbox"
                  checked={openArticleId === article.id}
                  onChange={() => handleToggle(article.id)}
                />
                <div className="collapse-title text-white text-lg font-semibold flex items-center h-11 py-1">
                  <span>{article.title}</span>
                </div>
              </div>
            </div>
            {openArticleId === article.id && (
              <div className="bg-[#26273b] p-8">
                <p>{article.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WikipediaArticleAccordion;
