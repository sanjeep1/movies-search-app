import React from 'react';

const FilterBar = ({ sortOption, setSortOption, typeFilter, setTypeFilter }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
      {/* Sort Dropdown */}
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
        <label
          htmlFor="sort"
          className="text-gray-700 dark:text-gray-300 font-semibold"
        >
          Sort by:
        </label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="year_desc">Year (Newest First)</option>
          <option value="year_asc">Year (Oldest First)</option>
          <option value="title_asc">Title (A-Z)</option>
          <option value="title_desc">Title (Z-A)</option>
        </select>
      </div>

      {/* Type Filter */}
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
        <label
          htmlFor="type"
          className="text-gray-700 dark:text-gray-300 font-semibold"
        >
          Filter by type:
        </label>
        <select
          id="type"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="">All Types</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="episode">Episode</option>
        </select>
      </div>

      {/* Reset Filter Button */}
      <button
        onClick={() => setTypeFilter('')}
        className="whitespace-nowrap px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md shadow-md transition focus:outline-none focus:ring-2 focus:ring-red-500"
        title="Reset Type Filter"
        aria-label="Reset filter to show all types"
      >
        Reset Filter
      </button>
    </div>
  );
};

export default FilterBar;