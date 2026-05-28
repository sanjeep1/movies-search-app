# Movies Search App

A modern React application for searching and discovering movies using the OMDb API. The app offers search history, filters, pagination, featured movie suggestions, and detailed movie pages with related recommendations.

![Version](https://img.shields.io/badge/version-0.0.0-blue)

## Why this project is useful

- Search movies, series, and episodes by title.
- Browse detailed movie pages with plot, cast, ratings, and trailer links.
- Filter and sort search results by type and year.
- Save recent search history in the browser.
- Built with React, Vite, Tailwind CSS, and the OMDb API.

## Features

- Real-time movie search powered by OMDb
- Sort and filter results by type and year
- Infinite load-more support for additional results
- Movie detail pages with related suggestions
- Responsive UI with dark mode support
- Search history persisted in local storage

## Getting started

### Prerequisites

- Node.js 18+ or later
- npm 10+ or pnpm/yarn equivalent

### Install dependencies

```bash
cd movies-search-app
npm install
```

### Configure environment variables

Create a `.env` file in the project root with your OMDb API key:

```env
VITE_OMDB_API_KEY=your_api_key_here
```

### Run the development server

```bash
npm run dev
```

Open the local URL shown in the terminal to view the app.

## Build for production

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Project structure

- `src/main.jsx` — app entry point
- `src/App.jsx` — primary application layout and routing
- `src/api/omdb.js` — OMDb API integration
- `src/pages/Home.jsx` — search page with filters and results
- `src/pages/MovieDetailPage.jsx` — detailed movie view
- `src/components/` — reusable UI components
- `src/context/` — theme context and hooks
- `src/utils/` — favorites and local storage helpers

## Usage examples

### Search for a movie

1. Enter a movie or series title in the search bar.
2. Press Enter or click the search button.
3. Scroll through results and load more movies if available.

### Open a movie detail page

1. Click a movie card from the search results.
2. View plot, cast, ratings, and related recommendations.

## Support

For help, open an issue in this repository or contact the maintainer through the project issue tracker.

## Contributing

Contributions are welcome. Please follow standard GitHub contribution workflows:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

If this repo contains a `CONTRIBUTING.md` file, please follow that document for guidelines.
