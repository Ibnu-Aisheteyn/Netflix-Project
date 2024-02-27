import React, { useEffect, useState } from "react";
import "./Row.css";
import axios from "./axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
let base_url = "http://image.tmdb.org/t/p/original/"; //this url isonly for the images.
function Row({ title, fetchUrl, isLargeRow }) {
  //we need the useState because we're about to fetch a variable from the movie data base
  let [movies, setMovies] = useState([]);
  let [trailerUrl, setTrailerUrl] = useState("");
  //In order to apply the effect, we need the useEffect method
  useEffect(() => {
    async function fetchData() {
      let request = await axios.get(fetchUrl);
      //   console.log(request);
      //from the above results sent to your console, you only need data, and from the data results.
      setMovies(request.data.results);
      //   console.log(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  let opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1, // Corrected parameter name to lowercase
    },
  };

  let handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name)
        .then((url) => {
          let urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  console.log(movies);

  return (
    <div className="row">
      <h1>{title}</h1>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            onClick={() => handleClick(movie)}
            key={movie.id} // Adding key prop for optimization
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      <div style={{ padding: "40px" }}>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
    </div>
  );
}

export default Row;
// hosting url: https://my-netflix-dca30.web.app
