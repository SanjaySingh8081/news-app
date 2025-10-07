import React from 'react';

export default function NewsItem(props) {
  let { title, description, imageUrl, newsUrl, author, date, source } = props;

  return (
    <div className="my-3">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>
          <span className="badge rounded-pill bg-danger">{source}</span>
        </div>
        <img
          src={imageUrl ? imageUrl : "https://via.placeholder.com/400x200?text=No+Image"}
          className="card-img-top"
          alt="news"
        />
        <div className="card-body">
          <h5 className="card-title">{title ? title.slice(0, 60) : ""}...</h5>
          <p className="card-text">{description ? description.slice(0, 100) : ""}...</p>
          <p className="card-text">
            <small className="text-muted">
              By {author ? author : "Unknown"} on {new Date(date).toGMTString()}
            </small>
          </p>
          <a
            href={newsUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-sm btn-dark"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
}
