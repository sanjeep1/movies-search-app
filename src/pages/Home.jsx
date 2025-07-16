import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import { searchMovies } from '../api/omdb';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentQuery, setCurrentQuery] = useState('');

  const handleSearch = async (query) => {
    if (!query) return;

    setLoading(true);
    setError('');
    setPage(1);
    setCurrentQuery(query);

    try {
      const data = await searchMovies(query, 1);
      if (data.Response === 'True') {
        setMovies(data.Search);
        setHasMore(Number(data.totalResults) > 10);
      } else {
        setMovies([]);
        setHasMore(false);
        setError(data.Error || 'No movies found');
      }
    } catch (err) {
      setError('Something went wrong.');
    }
    setLoading(false);
  };

  const loadMore = async () => {
    if (!hasMore || loading) return;

    const nextPage = page + 1;
    setLoading(true);

    try {
      const data = await searchMovies(currentQuery, nextPage);
      if (data.Response === 'True') {
        setMovies((prevMovies) => [...prevMovies, ...data.Search]);
        setPage(nextPage);

        const total = Number(data.totalResults);
        const loaded = nextPage * 10;
        setHasMore(loaded < total);
      } else {
        setHasMore(false);
        setError(data.Error || 'No more movies found');
      }
    } catch (err) {
      setError('Something went wrong.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <SearchBar onSearch={handleSearch} />

      {loading && <LoadingSpinner />}

      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && movies.length > 0 && <MovieList movies={movies} />}

      {!loading && !error && movies.length === 0 && currentQuery && (
        <p className="text-center text-gray-500">No movies found</p>
      )}

      {hasMore && !loading && movies.length > 0 && (
        <div className="text-center mt-6">
          <button
            onClick={loadMore}
            disabled={loading}
            className={`px-4 py-2 rounded text-white ${
              loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
