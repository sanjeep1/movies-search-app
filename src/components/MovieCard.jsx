import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { getFavorites, toggleFavorite } from "../utils/favorites";

const MovieCard = ({ movie }) => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from local storage on mount
  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const updated = toggleFavorite(movie);
    setFavorites(updated);
  };

  const isFav = favorites.some((fav) => fav.imdbID === movie.imdbID);

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded overflow-hidden hover:shadow-lg transition flex flex-col">
      {/* Movie Link */}
      <Link to={`/movie/${movie.imdbID}`}>
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/300x445?text=No+Image"
          }
          alt={movie.Title}
          className="w-full h-64 object-cover"
        />
        <div className="p-4 text-center">
          <h2 className="font-semibold text-gray-900 dark:text-gray-100">
            {movie.Title}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {movie.Year} — {movie.Type}
          </p>
        </div>
      </Link>

      <button
        onClick={handleToggleFavorite}
        className={`flex items-center justify-center gap-2 py-2 w-full transition ${
          isFav
            ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
            : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200"
        }`}
      >
        {isFav ? <FaHeart /> : <FaRegHeart />}
        {isFav ? "Remove Favorite" : "Add to Favorites"}
      </button>
    </div>
  );
};

export default MovieCard;
