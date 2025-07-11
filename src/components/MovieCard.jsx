import { Link } from 'react-router-dom';


const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.imdbID}`}>
      <div className="bg-white shadow rounded overflow-hidden p-4 text-center">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x445?text=No+Image'}
          alt={movie.Title}
          className="w-full h-64 object-cover rounded"
        />
        <h2 className="font-semibold mt-2">{movie.Title}</h2>
        <p className="text-sm text-gray-600">
          {movie.Year} — {movie.Type}
        </p>
      </div>
    </Link>
  );
};

export default MovieCard;
