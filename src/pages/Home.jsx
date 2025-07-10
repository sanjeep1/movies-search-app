import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import { searchMovies } from '../api/omdb';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (query) => {
    setLoading(true);
    setError('');
    try {
      const data = await searchMovies(query);
      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError(data.Error || 'No movies found');
      }
    } catch (err) {
      setError('Something went wrong.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <SearchBar onSearch={handleSearch} />
      {loading && <p className="text-center text-blue-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && <MovieList movies={movies} />}
    </div>
  );
};

export default Home;