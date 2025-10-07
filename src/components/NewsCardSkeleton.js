import React from 'react';

export default function NewsCardSkeleton() {
  return (
    <div className="col-md-4">
      <div className="card my-3" aria-hidden="true">
        <div className="card-img-top skeleton-image" />
        <div className="card-body">
          <h5 className="card-title placeholder-glow">
            <span className="placeholder col-10"></span>
            <span className="placeholder col-7"></span>
          </h5>
          <p className="card-text placeholder-glow">
            <span className="placeholder col-8"></span>
            <span className="placeholder col-9"></span>
            <span className="placeholder col-6"></span>
          </p>
          <div className="btn btn-dark disabled placeholder col-4 mt-auto"></div>
        </div>
      </div>
    </div>
  );
}