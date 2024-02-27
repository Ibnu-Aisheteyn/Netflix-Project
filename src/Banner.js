import React, { useEffect, useState } from "react";
import "./Banner.css";
import axios from "./axios";
import requests from "./requests";
let base_url = "http://image.tmdb.org/t/p/original/";
function Banner() {
  let [movie, setMovie] = useState([]);
  useEffect(() => {
    async function fetchData() {
      let request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length)
        ]
      );
      return request;
    }
    fetchData(); //the function is called inside useEffect
  }, []);
  console.log(movie);

  function truncate(str, maxLength = 150) {
    // Check if the string is defined and longer than the specified maxLength
    if (str && str.length > maxLength) {
      // Truncate the string to the specified maxLength and append an ellipsis
      return str.substring(0, maxLength) + "...";
    } else {
      // If the string is already shorter than or equal to the maxLength, return the original string
      return str;
    }
  }

  return (
    <header
      className="banner" // Assigning the CSS class "banner" to the <header> element
      style={{
        // Applying inline CSS styles using the style attribute
        backgroundSize: "cover", // Setting the background size to cover the entire element
        backgroundImage: `url("${base_url}${movie?.backdrop_path}")`, // Setting the background image dynamically using movie backdrop_path
        backgroundPosition: "center center", // Setting the background position to center both horizontally and vertically
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="movie__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">{truncate(movie.overview)}</h1>
      </div>
      <div className="banner__fadeButton" />
    </header>
  );
}

export default Banner;
