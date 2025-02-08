import React, { useState } from "react";

const ArticleWithReadMore = ({ content }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <p className="article-content">
        {isExpanded ? content : `${content.substring(0, 100)}...`}
      </p>
      <button onClick={toggleReadMore} className="read-more-button">
        {isExpanded ? "Read Less" : "Read More"}
      </button>
    </div>
  );
};

export default ArticleWithReadMore;
