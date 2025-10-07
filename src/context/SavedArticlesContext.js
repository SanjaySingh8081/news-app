import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const SavedArticlesContext = createContext();

// Create a custom hook for easy access to the context
export const useSavedArticles = () => {
  return useContext(SavedArticlesContext);
};

// Create the provider component
export const SavedArticlesProvider = ({ children }) => {
  const [savedArticles, setSavedArticles] = useState([]);

  // On initial load, get saved articles from localStorage
  useEffect(() => {
    const storedArticles = JSON.parse(localStorage.getItem('savedNewsArticles')) || [];
    setSavedArticles(storedArticles);
  }, []);

  const addArticle = (article) => {
    const newSavedArticles = [...savedArticles, article];
    setSavedArticles(newSavedArticles);
    localStorage.setItem('savedNewsArticles', JSON.stringify(newSavedArticles));
  };

  const removeArticle = (articleUrl) => {
    const newSavedArticles = savedArticles.filter(article => article.newsUrl !== articleUrl);
    setSavedArticles(newSavedArticles);
    localStorage.setItem('savedNewsArticles', JSON.stringify(newSavedArticles));
  };

  const isArticleSaved = (articleUrl) => {
    return savedArticles.some(article => article.newsUrl === articleUrl);
  };

  const value = {
    savedArticles,
    addArticle,
    removeArticle,
    isArticleSaved,
  };

  return (
    <SavedArticlesContext.Provider value={value}>
      {children}
    </SavedArticlesContext.Provider>
  );
};