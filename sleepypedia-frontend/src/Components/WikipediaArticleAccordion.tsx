import { useState } from "react";
import CrossIcon from "../assets/icons/CrossIcon";

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

const WikipediaArticleAccordion = ({
  articles,
  onRemoveArticle,
  isPlaying,
}: Props) => {
  const [openArticleId, setOpenArticleId] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setOpenArticleId(openArticleId === id ? null : id);
  };

  return (
    <div className="w-full font-figtree">
      <h3 className="font-figtree mb-2 text-gray-500 text-sm">
        Article Playlist
      </h3>
      <div className="join join-vertical w-full">
        {articles.map((article) => (
          <div key={article.id} className="rounded-md mb-2 overflow-hidden">
            <div className="flex items-center bg-[#1c1c2d] h-11">
              <div className="h-11 w-11 flex items-center justify-center">
                {isPlaying ? (
                  <div className="text-white opacity-30">
                    <CrossIcon />
                  </div>
                ) : (
                  <button
                    onClick={() => onRemoveArticle(article.id)}
                    className="btn btn-ghost btn-sm p-0 hover:bg-transparent text-white hover:text-gray-600">
                    <CrossIcon />
                  </button>
                )}
              </div>
              <div className={`collapse collapse-arrow flex-grow`}>
                <input
                  type="checkbox"
                  checked={openArticleId === article.id}
                  onChange={() => handleToggle(article.id)}
                />
                <div className="collapse-title text-white text-base font-semibold flex items-center h-11 py-1">
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
