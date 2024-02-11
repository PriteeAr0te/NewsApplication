import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Loading from "./Loading";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    try {
      props.setProgress(10);
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${process.env.REACT_APP_NEWS_API}&category=${props.category}&page=${page}&pageSize=${props.pageSize}`;
      // this.setState({loading:true});
      setLoading(true);
      let data = await fetch(url);
      props.setProgress(30);
      let parseData = await data.json();
      console.log(parseData);
      props.setProgress(70);
      setArticles(parseData.articles);
      setTotalResults(parseData.totalResults);
      setLoading(false);
      props.setProgress(100);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    updateNews();
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
  }, []);

  const fetchMoreData = async () => {
    try {
      let url = `https://newsapi.org/v2/top-headlines?country=${
        props.country
      }&apiKey=${process.env.REACT_APP_NEWS_API}&category=${
        props.category
      }&page=${page + 1}&pageSize=${props.pageSize}`;
      setPage(page + 1);
      // setLoading(true)
      let data = await fetch(url);
      let parseData = await data.json();
      setArticles((prevArticles) => [...prevArticles, ...parseData.articles]);
      setTotalResults(parseData.totalResults);
      setLoading(false);
      // setPage(nextPage)
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const hasArticles = (articles && articles.length) > 0;
  const hasMore = (hasArticles && articles.length) < totalResults;

  return (
    <>
      <div className="container justify-content-center">
        <h2
          className="text-center"
          style={{ margin: "30px 0px", marginTop: "90px", background: "grey" }}
        >
          NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines
        </h2>
        {loading && <Loading />}
        <InfiniteScroll
          dataLength={articles?.length ? articles.length : 0}
          // dataLength={articles.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<Loading />}
        >
          <div className="container">
            <div className="row ">
              {articles?.map((element, index) => {
                return (
                  <div className="col-md-4" key={index}>
                    <NewsItem
                      title={element.title ? element.title : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 88)
                          : ""
                      }
                      imageUrl={element.urlToImage}
                      url={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {!hasMore && !loading && (
          <div className="text-center">No more articles to load</div>
        )}
      </div>
    </>
  );
};

News.defaultProp = {
  country: "in",
  pageSize: 9,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
export default News;
