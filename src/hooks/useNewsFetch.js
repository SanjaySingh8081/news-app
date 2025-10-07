import { useState, useEffect } from 'react';

const useNewsFetch = (category, query) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState(null);
  const [totalResults, setTotalResults] = useState(0);

  // ✅ Access API key from .env
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;

  useEffect(() => {
    const fetchInitialNews = async () => {
      setLoading(true);
      setArticles([]); // ✅ Clear old articles when category/query changes

      if (!apiKey) {
        console.error("❌ API Key is missing! Check your .env file.");
        setLoading(false);
        return;
      }

      let url = '';
      if (query && query.trim() !== '') {
        url = `https://newsdata.io/api/1/news?apikey=${apiKey}&country=in&q=${query}`;
      } else {
        const apiCategory = category === 'general' ? 'top' : category;
        url = `https://newsdata.io/api/1/news?apikey=${apiKey}&country=in&category=${apiCategory}`;
      }

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.results && Array.isArray(data.results)) {
          setArticles(data.results);
          setTotalResults(data.totalResults || data.results.length);
          setNextPage(data.nextPage || null);
        } else {
          console.warn("⚠️ No results found:", data);
          setArticles([]);
          setTotalResults(0);
        }
      } catch (error) {
        console.error("❌ Error fetching initial news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialNews();
  }, [category, query, apiKey]);

  // ✅ Infinite scroll fetch
  const fetchMoreData = async () => {
    if (!nextPage) return;

    const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&country=in&page=${nextPage}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.results && Array.isArray(data.results)) {
        setArticles(prevArticles => prevArticles.concat(data.results));
        setNextPage(data.nextPage || null);
      }
    } catch (error) {
      console.error("❌ Error fetching more data:", error);
    }
  };

  return { articles, loading, totalResults, fetchMoreData };
};

export default useNewsFetch;
