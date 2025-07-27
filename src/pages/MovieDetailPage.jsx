import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails, searchMovies } from "../api/omdb";
import { FaArrowLeft, FaPlay } from "react-icons/fa";
import MovieCard from "../components/MovieCard";

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [relatedLoading, setRelatedLoading] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieDetails(id);
        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError(data.Error || "Movie not found");
        }
      } catch (err) {
        setError("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  // Fetch Related Movies after movie details are loaded
  useEffect(() => {
    if (!movie) return;

    const fetchRelated = async () => {
      setRelatedLoading(true);

      // Take the first genre word as a related search term
      const genreKeyword = movie.Genre?.split(",")[0]?.trim() || movie.Title;

      try {
        const data = await searchMovies(genreKeyword);
        if (data.Response === "True") {
          // Filter out the current movie itself
          const filtered = data.Search.filter(
            (m) => m.imdbID !== movie.imdbID
          );
          setRelatedMovies(filtered.slice(0, 4));
        } else {
          setRelatedMovies([]);
        }
      } catch (err) {
        console.error("Related movies fetch failed:", err);
      }
      setRelatedLoading(false);
    };

    fetchRelated();
  }, [movie]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[50vh] text-gray-500">
        Loading movie details...
      </div>
    );

  if (error)
    return <p className="text-center text-red-500 p-6">{error}</p>;

  if (!movie) return null;

  const trailerSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    `${movie.Title} trailer`
  )}`;

  return (
    <div className="relative w-full min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Background Poster */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 blur-sm"
        style={{
          backgroundImage: `url(${
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/1200x800?text=No+Image"
          })`,
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90"></div>

      <div className="relative z-10 max-w-6xl mx-auto p-6 text-white">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center text-blue-400 hover:underline mb-6"
        >
          <FaArrowLeft className="mr-2" /> Back to Home
        </Link>

        {/* Movie Main Details */}
        <div className="flex flex-col md:flex-row gap-8 bg-black/40 rounded-xl p-6 shadow-lg">
          <div className="flex-shrink-0 w-full md:w-1/3">
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/300x445?text=No+Image"
              }
              alt={movie.Title}
              className="w-full rounded-xl shadow-2xl"
            />
          </div>

          <div className="flex-1 space-y-4">
            <h1 className="text-4xl font-bold">
              {movie.Title}{" "}
              <span className="text-lg text-gray-300">({movie.Year})</span>
            </h1>
            <p className="text-gray-300">{movie.Genre} • {movie.Runtime}</p>

            {/* Ratings */}
            <div className="flex gap-4 text-sm text-gray-300">
              <span>⭐ <strong>IMDb:</strong> {movie.imdbRating}/10</span>
              <span>|</span>
              <span><strong>Director:</strong> {movie.Director}</span>
            </div>

            {/* Plot */}
            <p className="text-gray-200 leading-relaxed">
              <strong>Plot:</strong> {movie.Plot}
            </p>

            {/* Cast */}
            <p className="text-sm text-gray-300">
              <strong>Actors:</strong> {movie.Actors}
            </p>

            {/* Watch Trailer Button */}
            <a
              href={trailerSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-lg transition-all"
            >
              <FaPlay /> Watch Trailer
            </a>
          </div>
        </div>

        {/* Related Movies Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Related Movies
          </h2>

          {relatedLoading && <p className="text-gray-400">Loading related movies...</p>}

          {!relatedLoading && relatedMovies.length === 0 && (
            <p className="text-gray-400">No related movies found.</p>
          )}

          {!relatedLoading && relatedMovies.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
              {relatedMovies.map((relMovie) => (
                <MovieCard key={relMovie.imdbID} movie={relMovie} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;