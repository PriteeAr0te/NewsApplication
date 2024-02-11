import "./App.css";

import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import LoadingBar from "react-top-loading-bar";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  const pageSize = 12;
  const [progress, setProgress] = useState(0);

  // const apiKey = process.env.REACT_APP_NEWS_API;

  return (
    <BrowserRouter>
      <div>
        <LoadingBar color="#0096c7" height={3} progress={progress} />
        <Navbar />
        <Routes>
          {/* <News   setPpageSize={12} country="in" category="sports"/> */}
          <Route
            path="/"
            element={
              <News
                setProgress={setProgress}
                key="general"
                pageSize={pageSize}
                country="in"
                category="general"
                // apiKey={apiKey}
              />
            }
          />
          <Route
            path="/business"
            element={
              <News
                setProgress={setProgress}
                key="business"
                pageSize={pageSize}
                country="in"
                category="business"
                // apiKey={apiKey}
              />
            }
          />
          <Route
            path="/entertainment"
            element={
              <News
                setProgress={setProgress}
                key="entertainment"
                pageSize={pageSize}
                country="in"
                category="entertainment"
                // apiKey={apiKey}
              />
            }
          />
          <Route
            path="/health"
            element={
              <News
                setProgress={setProgress}
                key="health"
                pageSize={pageSize}
                country="in"
                category="health"
                // apiKey={apiKey}
              />
            }
          />
          <Route
            path="/science"
            element={
              <News
                setProgress={setProgress}
                key="science"
                pageSize={pageSize}
                country="in"
                category="science"
                // apiKey={apiKey}
              />
            }
          />
          <Route
            path="/sports"
            element={
              <News
                setProgress={setProgress}
                key="sports"
                pageSize={pageSize}
                country="in"
                category="sports"
                // apiKey={apiKey}
              />
            }
          />
          <Route
            path="/technology"
            element={
              <News
                setProgress={setProgress}
                key="technology"
                pageSize={pageSize}
                country="in"
                category="technology"
                // apiKey={apiKey}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
