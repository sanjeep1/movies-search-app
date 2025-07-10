import MovieCard from './MovieCard';

const MovieList = ({ movies }) => {
  if (!movies || movies.length === 0) {
    return <p className="text-center text-gray-500">No movies found.</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
