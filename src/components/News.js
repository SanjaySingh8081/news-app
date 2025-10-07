import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function News(props) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiKey = process.env.REACT_APP_NEWS_API_KEY;
  
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsApp`;

    const fetchNews = async () => {
      if (!apiKey) {
        console.error("API Key is missing!");
        setLoading(false);
        return;
      }
      
      // Use the NewsData.io API endpoint
      // Note: The category 'general' is not supported, so we'll use a default like 'top' news.
      const category = props.category === 'general' ? 'top' : props.category;
      const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&country=in&category=${category}`;
      
      setLoading(true);
      try {
        const response = await fetch(url);
        const data = await response.json();

        // The NewsData.io API returns articles in the 'results' array.
        if (data.results) {
          setArticles(data.results);
        } else {
          console.error("Error fetching news from NewsData.io:", data);
          setArticles([]);
        }
      } catch (error) {
        console.error("An error occurred during the fetch operation.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [props.category, apiKey]);

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4" style={{marginTop: '70px'}}>
        NewsApp - Top {capitalizeFirstLetter(props.category)} Headlines
      </h2>
      
      {loading && (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {!loading && (
        <div className="row">
          {articles && articles.length > 0 ? (
            articles.map((element) => (
              // Use element.article_id as a key since it's unique
              <div className="col-md-4" key={element.article_id}>
                {/* Map the NewsData.io data structure to our NewsItem component */}
                <NewsItem 
                  title={element.title} 
                  description={element.description} 
                  imageUrl={element.image_url}
                  newsUrl={element.link}
                  author={element.creator ? element.creator[0] : element.source_id}
                  date={element.pubDate}
                  source={element.source_id}
                />
              </div>
            ))
          ) : (
            <p className="text-center">No news articles to display for this category.</p>
          )}
        </div>
      )}
    </div>
  );
}

News.defaultProps = {
  category: 'general',
}