import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function News(props) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  git add . const apiKey = process.env.REACT_APP_NEWS_API_KEY;

  
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
      
      // CHANGE 1: Updated URL for the GNews API
      const url = `https://gnews.io/api/v4/top-headlines?category=${props.category}&lang=en&country=in&apikey=${apiKey}`;
      setLoading(true);
      try {
        const response = await fetch(url);
        const data = await response.json();

        // CHANGE 2: GNews returns 'articles' directly, so we check for that
        if (data.articles) {
          setArticles(data.articles);
        } else {
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
              <div className="col-md-4" key={element.url}>
                {/* CHANGE 3: The prop names from GNews are slightly different */}
               
<NewsItem 
  title={element.title} 
  description={element.description} 
  imageUrl={element.image} 
  newsUrl={element.url}
  author={element.source.name} 
  date={element.publishedAt}
  source={element.source.name}
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