import axios from 'axios';

const API_KEY = import.meta.env.OMDB_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

/**
 * Search movies.
 */
export const searchMovies = async (query, page = 1, type = '') => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        s: query,
        page,
        type,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch movies');
  }
};

/**
 * Get full movie details by IMDb ID.
 */
export const getMovieDetails = async (id) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        i: id,
        plot: 'full',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch movie details');
  }
};

// Fetch movie suggestions based on a query
export const fetchSuggestions = async (query) => {
  if (!query) return [];
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        s: query,
        page: 1,
      },
    });
    if (response.data.Response === "True") {
      return response.data.Search.map((movie) => ({
        title: movie.Title,
        poster: movie.Poster,
      }));
    }
    return [];
  } catch (error) {
    console.error("Suggestion fetch error", error);
    return [];
  }
};

/**
 * Fetch movie details by title.
 */
export const getMovieByTitle = async (title) => {
  if (!title) return null;
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        t: title, // fetch by title
        plot: 'short'
      },
    });
    if (response.data.Response === "True") {
      return {
        title: response.data.Title,
        poster:
          response.data.Poster && response.data.Poster !== "N/A"
            ? response.data.Poster
            : "https://via.placeholder.com/300x445?text=No+Image",
        year: response.data.Year,
        imdbID: response.data.imdbID,
        description: response.data.Plot !== "N/A" ? response.data.Plot : "No description available."
      };
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch featured movie:", error);
    return null;
  }
};
