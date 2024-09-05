interface WikipediaArticle {
  id: number;
  title: string;
  content: string;
}

interface Props {
  articles: WikipediaArticle[];
  selectedArticle: WikipediaArticle | null;
  onSelectArticle: (article: WikipediaArticle) => void;
  onRemoveArticle: (id: number) => void;
  isPlaying: boolean;
}

const ArticleList = ({
  articles,
  selectedArticle,
  onSelectArticle,
  onRemoveArticle,
  isPlaying,
}: Props) => (
  <div className="w-1/3 pr-4">
    <h3 className="text-lg font-bold mb-2">Article List</h3>
    <ul className="space-y-2">
      {articles.map((article, index) => (
        <li
          key={article.id}
          className={`flex justify-between items-center p-2 rounded cursor-pointer ${
            selectedArticle?.id === article.id
              ? "bg-gray-200"
              : "hover:bg-gray-100"
          }`}
          onClick={() => onSelectArticle(article)}>
          <span>
            {index + 1}. {article.title}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemoveArticle(article.id);
            }}
            disabled={isPlaying}
            className={`px-2 py-1 text-white rounded ${
              isPlaying
                ? "bg-red-300 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            }`}>
            X
          </button>
        </li>
      ))}
    </ul>
  </div>
);
export default ArticleList;
