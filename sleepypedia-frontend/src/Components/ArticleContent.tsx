import React from "react";

interface ArticleContentProps {
  content: string | null;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ content }) => (
  <div className="w-2/3">
    <h3 className="text-lg font-bold mb-2">Article Content</h3>
    <div className="border border-gray-300 p-4 h-72 overflow-y-auto">
      {content || "No article selected"}
    </div>
  </div>
);
export default ArticleContent;
