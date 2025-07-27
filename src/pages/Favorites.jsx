import { useState, useEffect } from "react";
import { getFavorites } from "../utils/favorites";
import MovieCard from "../components/MovieCard";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        ❤️ Your Favorite Movies
      </h1>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No favorites yet. Go add some!
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favorites.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
