import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import NewsItem from "./NewsItem";
import NewsCardSkeleton from "./NewsCardSkeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import "bootstrap/dist/css/bootstrap.min.css";
import useNewsFetch from "../hooks/useNewsFetch";

export default function News(props) {
  const { query } = useParams();
  const { category = "general" } = props;

  const { articles, loading, totalResults, fetchMoreData } = useNewsFetch(category, query);

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // 🧠 Dynamic Page Title
  useEffect(() => {
    const title = query ? `Search for: ${query}` : `${capitalizeFirstLetter(category)} Headlines`;
    document.title = `${title} - NewsApp`;
  }, [category, query]);

  const pageTitle = query
    ? `Search Results for: "${query}"`
    : `Top ${capitalizeFirstLetter(category)} Headlines`;

  return (
    <div className="container my-4">
      <h2 className="main-title">{pageTitle}</h2>

      {/* Debugging Indicator (remove in production) */}
      {/* <h1 style={{ color: "red" }}>IS THIS FILE UPDATING?</h1> */}

      {loading && articles.length === 0 ? (
        // 🔹 Only show skeletons for initial load
        <div className="row">
          {Array.from({ length: 6 }).map((_, index) => (
            <NewsCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <InfiniteScroll
  dataLength={articles ? articles.length : 0}
  next={fetchMoreData}
  hasMore={articles && articles.length < totalResults}
  loader={
    <div className="text-center my-4">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  }
  endMessage={
    <p style={{ textAlign: "center" }} className="my-4">
      <b>Yay! You have seen it all</b>
    </p>
  }
>
          <div className="row">
            {articles.length > 0 ? (
              articles.map((element) => (
                <div className="col-md-4 d-flex mb-4" key={element.article_id || element.link}>
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
              <p className="text-center">No news articles found.</p>
            )}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
}
