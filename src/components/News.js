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
        setLoading(false);
        return;
      }
      
      // THE CHANGE IS HERE: We are now using the /everything endpoint with a search query.
      // This is much more reliable for finding news about India.
      const url = `https://newsapi.org/v2/everything?q=${props.category} india&sortBy=publishedAt&apiKey=${apiKey}`;
      setLoading(true);
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.status === "ok") {
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
  }, [props.category]);

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
                <NewsItem 
                  title={element.title} 
                  description={element.description} 
                  imageUrl={element.urlToImage} 
                  newsUrl={element.url}
                  author={element.author}
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