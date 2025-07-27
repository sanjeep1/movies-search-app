import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import { searchMovies } from "../api/omdb";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";
import FilterBar from "../components/FilterBar";
import FeaturedMoviesCarousel from "../components/FeaturedMoviesCarousel";

const sampleTrending = ["Avengers", "Batman", "Inception", "Friends"];

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [currentQuery, setCurrentQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [sortOption, setSortOption] = useState("year_desc");
  const [typeFilter, setTypeFilter] = useState("");

  useEffect(() => {
    const savedHistory =
      JSON.parse(localStorage.getItem("movieSearchHistory")) || [];
    setSearchHistory(savedHistory);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("movieSearchHistory");
    setSearchHistory([]);
    toast.success("Search history cleared!", { position: "top-right" });
  };

  const handleSearch = async (query, pageNum = 1, type = typeFilter) => {
    if (!query.trim()) return;

    if (pageNum === 1) {
      setLoading(true);
      setError("");
      setMovies([]);
    }

    if (pageNum === 1) setPage(1);
    setCurrentQuery(query);

    try {
      const data = await searchMovies(query, pageNum, type);

      if (data.Response === "True") {
        if (pageNum === 1) {
          setMovies(data.Search);
        } else {
          setMovies((prev) => [...prev, ...data.Search]);
        }

        const totalResults = Number(data.totalResults);
        setHasMore(pageNum * 10 < totalResults);

        if (pageNum === 1) {
          setSearchHistory((prev) => {
            const updated = [
              query,
              ...prev.filter((item) => item !== query),
            ].slice(0, 5);
            localStorage.setItem(
              "movieSearchHistory",
              JSON.stringify(updated)
            );
            return updated;
          });
        }
      } else {
        if (pageNum === 1) {
          setMovies([]);
        }
        setHasMore(false);
        setError(`${data.Error || "No results"} for filter: ${type || "all types"}`);
      }
    } catch (err) {
      setError("Something went wrong.");
    }

    if (pageNum === 1) setLoading(false);
  };

  const loadMore = async () => {
    if (!hasMore || loadingMore) return;

    const nextPage = page + 1;
    const currentScrollY = window.scrollY;
    setLoadingMore(true);

    try {
      const data = await searchMovies(currentQuery, nextPage, typeFilter);

      if (data.Response === "True") {
        setMovies((prevMovies) => [...prevMovies, ...data.Search]);
        setPage(nextPage);

        const total = Number(data.totalResults);
        setHasMore(nextPage * 10 < total);

        requestAnimationFrame(() => window.scrollTo(0, currentScrollY));
      } else {
        setHasMore(false);
        setError(data.Error || "No more movies found");
      }
    } catch (err) {
      setError("Something went wrong.");
    }

    setLoadingMore(false);
  };

  const sortedMovies = [...movies].sort((a, b) => {
    switch (sortOption) {
      case "year_desc":
        return Number(b.Year) - Number(a.Year);
      case "year_asc":
        return Number(a.Year) - Number(b.Year);
      case "title_asc":
        return a.Title.localeCompare(b.Title);
      case "title_desc":
        return b.Title.localeCompare(a.Title);
      default:
        return 0;
    }
  });

  const handleTypeChange = (newType) => {
    setTypeFilter(newType);
    if (currentQuery) {
      handleSearch(currentQuery, 1, newType);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-black dark:text-white transition-colors duration-300">
      
      {/* 🎥 HERO SECTION */}
      <section className="relative text-center py-24 md:py-32 px-4 bg-gradient-to-b from-blue-50 dark:from-gray-900 dark:to-black">
        {/* Background cinematic glow */}
        <div className="absolute inset-0 bg-[url('https://image.tmdb.org/t/p/original/rSPw7tgCH9c6NqICZef4kZjFOQ5.jpg')] bg-cover bg-center opacity-20 blur-sm dark:opacity-30"></div>
        
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg">
            🎬 Find Your Next Favorite Movie
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mt-4 text-lg max-w-2xl mx-auto">
            Explore thousands of movies, series & episodes. Search and discover cinematic gems instantly.
          </p>

          {/* Glassmorphism search bar */}
          <div className="mt-8 max-w-2xl mx-auto relative backdrop-blur-md bg-white/70 dark:bg-gray-800/50 rounded-xl shadow-lg p-4">
            <SearchBar
              onSearch={(query) => handleSearch(query, 1)}
              searchHistory={searchHistory}
              clearHistory={clearHistory}
            />
          </div>

          {/* Trending Chips */}
          {!currentQuery && (
            <div className="flex justify-center flex-wrap gap-3 mt-6">
              {sampleTrending.map((t) => (
                <button
                  key={t}
                  onClick={() => handleSearch(t, 1)}
                  className="px-4 py-2 text-sm rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FILTER BAR */}
      {currentQuery && (
        <div className="max-w-6xl mx-auto px-4 mt-6">
          <FilterBar
            sortOption={sortOption}
            setSortOption={setSortOption}
            typeFilter={typeFilter}
            setTypeFilter={handleTypeChange}
          />
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-4 py-10 relative z-10">
        {loading && <LoadingSpinner />}
        {error && (
          <p className="text-center text-red-500 dark:text-red-400 mt-4 text-lg">
            {error}
          </p>
        )}

        {!loading && !error && movies.length > 0 && (
          <MovieList movies={sortedMovies} />
        )}

        {!loading && !error && movies.length === 0 && currentQuery && (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-4 text-lg">
            No movies found for your search
          </p>
        )}

        {/* BEFORE SEARCH: Show Featured CTA */}
        {!currentQuery && !loading && movies.length === 0 && (
          <div className="text-center mt-10">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
              Explore popular picks or search your own!
            </h2>
          </div>
        )}
        
        {/* LOAD MORE */}
        {hasMore && movies.length > 0 && (
          <div className="text-center mt-10">
            <button
              onClick={loadMore}
              disabled={loadingMore}
              className={`px-6 py-3 rounded-lg text-white font-semibold shadow-lg transition-all ${
                loadingMore
                  ? "bg-blue-400 cursor-wait"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loadingMore ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 inline-block mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  Loading...
                </>
              ) : (
                "Load More"
              )}
            </button>
          </div>
        )}

      {!currentQuery && (
        <FeaturedMoviesCarousel />
      )}
      </div>
    </div>
  );
};

export default Home;
