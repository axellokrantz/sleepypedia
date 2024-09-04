import React, { useState } from "react";

interface WikipediaArticle {
  title: string;
  content: string;
}

const WikipediaArticle: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [article, setArticle] = useState<WikipediaArticle | null>(null);

  const fetchRandomWikipediaArticle = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://localhost:5148/api/TextToSpeech/random-wikipedia"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch random Wikipedia article");
      }
      const data: WikipediaArticle = await response.json();
      setArticle(data);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to fetch random Wikipedia article");
    } finally {
      setIsLoading(false);
    }
  };

  const formatContent = (content: string) => {
    return content
      .split("\n")
      .map((paragraph, index) => <p key={index}>{paragraph}</p>);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h2>Random Wikipedia Article</h2>
      <button
        onClick={fetchRandomWikipediaArticle}
        disabled={isLoading}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          fontSize: "16px",
        }}>
        {isLoading ? "Fetching..." : "Fetch Random Wikipedia Article"}
      </button>
      {article && (
        <div style={{ marginBottom: "20px" }}>
          <h3>{article.title}</h3>
          <div
            style={{
              maxHeight: "300px",
              overflowY: "auto",
              border: "1px solid #ccc",
              padding: "10px",
            }}>
            {formatContent(article.content)}
          </div>
        </div>
      )}
    </div>
  );
};

export default WikipediaArticle;
