import axios from 'axios';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

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
