import React from "react";

const NewsItem = (props) => {
  let { title, description, imageUrl, url, author, source } = props;
  return (
    <div>
      <div className="card">
        <img
          src={
            !imageUrl
              ? "https://www.hindustantimes.com/ht-img/img/2023/11/17/1600x900/Narendra_Modi_1700219239787_1700219240044.jpg"
              : imageUrl
          }
          className="card-img-top"
          alt="..."
        />
        <div className="card-body" style={{ background: "grey" }}>
          <h5 className="card-title">
            {title}
            <small>
              <span className="badge bg-danger">{source}</span>
            </small>
          </h5>
          <p className="card-text">{description}...</p>
          <p className="card-text">
            <small className="text-body-secondary">
              by {!author ? "Unknown" : author} on {new Date().toGMTString()}
            </small>
          </p>
          <a href={url} target="_blank" className="btn btn-sm btn-dark">
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
