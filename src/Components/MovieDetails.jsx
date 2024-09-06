import React, { useEffect, useState } from "react";
import { genres, languages } from "../Data/filterId";
import { Tooltip } from "react-tooltip";
import "boxicons";
const MovieDetails = ({
  isModalOpen,
  toggleModal,
  movie,
  favoriteMovies,
  watchlistMovies,
  addToFavorites,
  addToWatchlist,
  RemoveFromFavourites,
  removeFromWatchlist,
}) => {
  if (!isModalOpen) return null;
  // // console.log("movieDetails re rendered")
  // const youtubeApiKey = import.meta.env.VITE_YOUTUBE_API_KEY
  const youtubeApiKey ="your api key"
  // console.log(youtubeApiKey)
  const [language, setLanguage] = useState("");
  const validGenres = genres.filter((genre) =>
    movie.genre_ids.includes(genre.id)
  );
  const [videoId, setvideoId] = useState(null);
  const fetchTrailer = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${youtubeApiKey}&q=${movie.title}+trailer`
      );
      const data = await response.json();
      // console.log(data)
      const videoID = data.items[0].id.videoId;
      if (videoID) {
        setvideoId(videoID);
      }
    } catch (error) {
      // console.log(error)
    }
  };
  useEffect(() => {
    const foundLanguage = languages.filter(
      (language) => language.code === movie.original_language
    );
    if (foundLanguage.length > 0) {
      setLanguage(foundLanguage[0].title);
    }
    // console.log("use Effect is called");
    if (videoId === null) {
      // console.log("fetching trailer");
      fetchTrailer();
    }
  }, []);

  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchlist, setIsWatchlist] = useState(false);
  useEffect(() => {
    const favorite = favoriteMovies.find((favMovie) => {
      return movie.id === favMovie.id;
    });
    setIsFavorite(favorite);
    const watchlist = watchlistMovies.find((watchMovie) => {
      return movie.id === watchMovie.id;
    });
    setIsWatchlist(watchlist);
  }, [favoriteMovies, watchlistMovies]);

  const handleFavClick = () => {
    if (isFavorite) {
      RemoveFromFavourites(movie);
    } else {
      addToFavorites(movie);
    }
  };
  const handleWatchClick = () => {
    if (isWatchlist) {
      removeFromWatchlist(movie);
    } else {
      addToWatchlist(movie);
    }
  };
  
  return (
    <div
      id="defaultModal"
      tabindex="-1"
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-[calc(100%-1rem)] max-h-full flex justify-center items-center bg-opacity-25 backdrop-blur-md"
      onClick={() => toggleModal(false)}
    >
      <div
        className="relative w-full max-w-2xl max-h-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* <!-- Modal header --> */}
          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <div className="flex space-x-2 items-center">
              <h className="text-xl font-semibold text-gray-900 dark:text-white">
                {movie.title}
              </h>
              <div className="icons-container flex space-x-2">
              {('maxTouchPoints' in navigator && navigator.maxTouchPoints > 0) ? (
        <></>
      ) : (
        <Tooltip id="my-tooltip" />
      )}
                {/* add to favourite icon container starts here */}
                <div className="fav-icon-container cursor-pointer" onClick={handleFavClick}>
                  <div
                    className="light dark:hidden"
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={
                      isFavorite
                        ? "Remove from favourites"
                        : "Add to favourites"
                    }
                  >
                    <box-icon
                      name="star"
                      type={isFavorite ? "solid" : "regular"}
                    ></box-icon>
                  </div>
                  <div
                    className="dark hidden dark:block"
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={
                      isFavorite
                        ? "Remove from favourites"
                        : "Add to favourites"
                    }
                  >
                    <box-icon
                      name="star"
                      type={isFavorite ? "solid" : "regular"}
                      color="#FFFFFF"
                    ></box-icon>
                  </div>
                </div>
                {/* Add to watchlist icon starts here  */}
                <div
                  className="watchlist-icon-container cursor-pointer"
                  onClick={handleWatchClick}
                >
                  <div
                    className="light dark:hidden"
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={
                      isWatchlist ? "Remove from watchlist" : "Add to watchlist"
                    }
                  >
                    <box-icon
                      name={isWatchlist ? "list-check" : "list-plus"}
                    ></box-icon>
                  </div>
                  <div
                    className="dark hidden dark:block"
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={
                      isWatchlist ? "Remove from watchlist" : "Add to watchlist"
                    }
                  >
                    <box-icon
                      name={isWatchlist ? "list-check" : "list-plus"}
                      color="#FFFFFF"
                    ></box-icon>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => toggleModal(false)}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* <!-- Modal body --> */}
          <div className="p-6 space-y-6">
            <div className="image-video-container flex justify-center">
              {/* <img
                className="rounded-t-lg"
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                alt=""
              /> */}
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${videoId}`}
                allowFullScreen
              ></iframe>
            </div>
            <div className="">
              <p className="text-lg">{movie.overview}</p>
              <div className="flex justify-start">
                <p className="inline-block my-2">
                  <span className="font-bold">Release Date : </span>
                  <span className="font-light">{movie.release_date}</span>
                </p>
                <p className="inline-block my-2 ml-8">
                  <span className="font-bold">Original Language : </span>
                  <span className="font-light">{language}</span>
                </p>
                <p className="inline-block my-2 ml-8">
                  <span className="font-bold">Rating : </span>
                  <span className="font-light">{movie.vote_average}</span>
                </p>
              </div>
              <div className="categories flex justify-start space-x-3 my-1">
                {validGenres.map((genre, index) => {
                  return (
                    <div
                      className="bg-green-400 text-white w-fit px-2 py-1 rounded-xl"
                      key={index}
                    >
                      {genre.title}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* <!-- Modal footer --> */}
          <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              type="button"
              onClick={() => toggleModal(false)}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
