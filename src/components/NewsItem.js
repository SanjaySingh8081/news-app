import React from 'react';
import { useSavedArticles } from '../context/SavedArticlesContext'; // <-- Import hook

export default function NewsItem(props) {
  let { title, description, imageUrl, newsUrl, author, date, source } = props;
  
  // Get functions and state from our global context
  const { addArticle, removeArticle, isArticleSaved } = useSavedArticles();
  
  // Check if the current article is already saved
  const saved = isArticleSaved(newsUrl);

  const handleSaveClick = (e) => {
    e.preventDefault(); // Prevent the link from firing when clicking the button
    e.stopPropagation(); // Stop the event from bubbling up to the parent link
    
    if (saved) {
      removeArticle(newsUrl);
    } else {
      addArticle(props); // Pass all props of the article to be saved
    }
  };

  return (
    <a href={newsUrl} target="_blank" rel="noreferrer" className="card-link-wrapper">
      <div className="card h-100"> 
        <div style={{ zIndex: 1, position: 'absolute', width: '100%', display: 'flex', justifyContent: 'space-between', padding: '0.5rem' }}>
          <span className="badge rounded-pill bg-danger">{source}</span>
          
          {/* --- NEW BOOKMARK BUTTON --- */}
          <button onClick={handleSaveClick} className="btn btn-sm btn-light" style={{ borderRadius: '50%' }}>
            <i className={`bi ${saved ? 'bi-bookmark-fill' : 'bi-bookmark'}`}></i>
          </button>
        </div>
        <img
          src={imageUrl ? imageUrl : "https://via.placeholder.com/400x200?text=No+Image"}
          className="card-img-top"
          alt="news"
        />
        <div className="card-body d-flex flex-column"> 
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <div className="mt-auto"> 
            <p className="card-text">
              <small className="text-muted">
                By {author ? author : "Unknown"} on {new Date(date).toGMTString()}
              </small>
            </p>
            <div className="btn btn-sm btn-dark mt-2" style={{width: 'fit-content'}}>
              Read More
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}