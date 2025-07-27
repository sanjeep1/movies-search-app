const FAVORITES_KEY = "favoriteMovies";

// Get all saved favorites
export const getFavorites = () => {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
};

// Save updated favorites list
export const saveFavorites = (favorites) => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

// Toggle favorite (add/remove)
export const toggleFavorite = (movie) => {
  const current = getFavorites();
  const exists = current.find((fav) => fav.imdbID === movie.imdbID);

  let updated;
  if (exists) {
    // remove if already exists
    updated = current.filter((fav) => fav.imdbID !== movie.imdbID);
  } else {
    // add new
    updated = [...current, movie];
  }

  saveFavorites(updated);
  return updated;
};

// Check if a movie is already a favorite
export const isFavorite = (imdbID) => {
  const current = getFavorites();
  return current.some((fav) => fav.imdbID === imdbID);
};