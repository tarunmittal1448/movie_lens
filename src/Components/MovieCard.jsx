import React, { useEffect, useState } from "react";
import MovieDetails from "./MovieDetails";
import "boxicons";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const MovieCard = ({
  movie,
  favoriteMovies,
  watchlistMovies,
  addToFavorites,
  addToWatchlist,
  RemoveFromFavourites,
  removeFromWatchlist,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = (value) => {
    setIsModalOpen(value);
  };

  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchlist, setIsWatchlist] = useState(false);

  // Update favorite and watchlist states when movies data changes
  useEffect(() => {
    const favorite = favoriteMovies.find((favMovie) => movie.id === favMovie.id);
    setIsFavorite(!!favorite); // Ensures boolean value

    const watchlist = watchlistMovies.find((watchMovie) => movie.id === watchMovie.id);
    setIsWatchlist(!!watchlist); // Ensures boolean value
  }, [favoriteMovies, watchlistMovies, movie.id]);

  // Handle adding/removing from favorites
  const handleFavClick = () => {
    if (isFavorite) {
      RemoveFromFavourites(movie);
    } else {
      addToFavorites(movie);
    }
    setIsFavorite(!isFavorite);
  };

  // Handle adding/removing from watchlist
  const handleWatchClick = () => {
    if (isWatchlist) {
      removeFromWatchlist(movie);
    } else {
      addToWatchlist(movie);
    }
    setIsWatchlist(!isWatchlist);
  };

  return (
    <>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img
            className="rounded-t-lg"
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            alt={movie.title}
          />
        </a>
        <div className="p-5">
          <div className="md:h-52 md:overflow-hidden">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {movie.title}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {movie.overview}
            </p>
          </div>
          <div className="flex justify-between h-10 items-center">
            <div className="button-container">
              <a
                href="#"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={(e) => {
                  e.preventDefault(); // Prevent page refresh
                  toggleModal(true);
                }}
              >
                Explore more
                <svg
                  className="w-3.5 h-3.5 ml-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </div>
            <div className="icons-container flex space-x-2">
              {('maxTouchPoints' in navigator && navigator.maxTouchPoints > 0) ? (
                <></>
              ) : (
                <Tooltip id="my-tooltip" />
              )}
              {/* Add to favorite icon */}
              <div className="fav-icon-container cursor-pointer" onClick={handleFavClick}>
                <div
                  className="light dark:hidden"
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={
                    isFavorite ? "Remove from favourites" : "Add to favourites"
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
                    isFavorite ? "Remove from favourites" : "Add to favourites"
                  }
                >
                  <box-icon
                    name="star"
                    type={isFavorite ? "solid" : "regular"}
                    color="#FFFFFF"
                  ></box-icon>
                </div>
              </div>

              {/* Add to watchlist icon */}
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
        </div>
      </div>

      {/* Modal for movie details */}
      <MovieDetails
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        movie={movie}
        favoriteMovies={favoriteMovies}
        watchlistMovies={watchlistMovies}
        addToFavorites={addToFavorites}
        addToWatchlist={addToWatchlist}
        RemoveFromFavourites={RemoveFromFavourites}
        removeFromWatchlist={removeFromWatchlist}
      />
    </>
  );
};

export default MovieCard;
