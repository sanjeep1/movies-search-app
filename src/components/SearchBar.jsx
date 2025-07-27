import { useState, useRef, useMemo, useEffect } from "react";
import { FaHistory } from "react-icons/fa";
import { useDebounce } from "../hooks/useDebounce";
import { fetchSuggestions } from "../api/omdb";

const SearchBar = ({ onSearch, searchHistory, clearHistory }) => {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [apiSuggestions, setApiSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const debouncedQuery = useDebounce(query, 500);
  const inputRef = useRef();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query.trim());
    setShowDropdown(false);
  };

  // Fetch suggestions from API when query changes and debounce to avoid too many requests
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setApiSuggestions([]);
      return;
    }

    const fetchData = async () => {
      setLoadingSuggestions(true);
      const suggestions = await fetchSuggestions(debouncedQuery);
      
      setApiSuggestions(suggestions);
      setLoadingSuggestions(false);
    };

    fetchData();
  }, [debouncedQuery]);

  const apiSuggestionTitles = apiSuggestions.map((m) => m.title);

  const mergedTitles = [
    ...new Set([
      ...searchHistory.filter((term) =>
        term.toLowerCase().includes(query.toLowerCase())
      ),
      ...apiSuggestionTitles,
    ]),
  ];

  const handleSelect = (term) => {
    setQuery(term);
    onSearch(term);
    setShowDropdown(false);
  };

  // Filter search history based on current query
  const filteredHistory = useMemo(() => {
    if (!query.trim()) return searchHistory;
    return searchHistory.filter((term) =>
      term.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, searchHistory]);

  // Get poster image by title from API suggestions
  const getPosterByTitle = (title) => {
    const movie = apiSuggestions.find(
      (m) => m.title.toLowerCase() === title.toLowerCase()
    );
    if (movie && movie.poster && movie.poster !== "N/A") return movie.poster;
    return null;
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Search form */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
          className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {/* Dropdown */}
      {showDropdown &&
        (filteredHistory.length > 0 ||
          apiSuggestions.length > 0 ||
          loadingSuggestions) && (
          <div className="absolute top-full mt-1 w-full bg-white dark:bg-gray-800 border rounded-md shadow-lg z-10 max-h-64 overflow-y-auto">
            {loadingSuggestions && (
              <div className="px-4 py-2 text-gray-500">Loading...</div>
            )}

            {/* Suggestions */}
            {!loadingSuggestions && apiSuggestions.length > 0 && (
              <>
                <div className="px-4 py-2 text-gray-700 dark:text-gray-300 font-semibold">
                  Suggestions
                </div>
                {mergedTitles.map((title, idx) => {
                  const poster = getPosterByTitle(title);
                  return (
                    <div
                      key={idx}
                      onMouseDown={() => handleSelect(title)}
                      className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {poster ? (
                        <img
                          src={poster}
                          alt={title}
                          className="w-10 h-14 object-cover rounded-md"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-10 h-14 bg-gray-300 dark:bg-gray-600 rounded-md flex items-center justify-center text-gray-500">
                          N/A
                        </div>
                      )}
                      <span>{title}</span>
                    </div>
                  );
                })}
                <div className="border-t border-gray-200 dark:border-gray-700"></div>
              </>
            )}

            {/* Recent Search */}
            {filteredHistory.length > 0 && (
              <>
                <div className="px-4 py-2 text-gray-700 dark:text-gray-300 font-semibold">
                  Recent Search
                </div>
                {filteredHistory.map((term, index) => (
                  <div
                    key={index}
                    onMouseDown={() => handleSelect(term)}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                  >
                    <FaHistory className="text-gray-500" />
                    <span>{term}</span>
                  </div>
                ))}
                <div className="border-t border-gray-200 dark:border-gray-700"></div>
                <div
                  onMouseDown={() => {
                    clearHistory();
                    setShowDropdown(false);
                  }}
                  className="px-4 py-2 text-sm text-red-500 cursor-pointer hover:bg-red-50 dark:hover:bg-gray-700"
                >
                  Clear search history
                </div>
              </>
            )}
          </div>
        )}
    </div>
  );
};

export default SearchBar;