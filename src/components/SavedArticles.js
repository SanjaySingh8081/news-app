import React from 'react';
import { useSavedArticles } from '../context/SavedArticlesContext';
import NewsItem from './NewsItem';

export default function SavedArticles() {
  const { savedArticles } = useSavedArticles();

  return (
    <div className="container my-4">
      <h2 className="main-title">Your Saved Articles</h2>
      <div className="row">
        {savedArticles.length > 0 ? (
          savedArticles.map((article) => (
            <div className="col-md-4" key={article.newsUrl}>
              <NewsItem
                title={article.title}
                description={article.description}
                imageUrl={article.imageUrl}
                newsUrl={article.newsUrl}
                author={article.author}
                date={article.date}
                source={article.source}
              />
            </div>
          ))
        ) : (
          <p className="text-center">You haven't saved any articles yet.</p>
        )}
      </div>
    </div>
  );
}