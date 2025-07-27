import MovieCard from './MovieCard';

const MovieList = ({ movies }) => {
  if (!movies || movies.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          😔 No movies found. Try a different search!
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        grid 
        grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 
        gap-6 sm:gap-8 
        px-2 sm:px-4 
        transition-all duration-300
      "
    >
      {movies.map((movie, index) => (
        <div
          key={movie.imdbID}
          className="
            transform transition 
            duration-300 
            hover:scale-105 hover:-translate-y-2 
            hover:shadow-lg 
            rounded-xl overflow-hidden
            animate-fadeIn
          "
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  );
};

export default MovieList;