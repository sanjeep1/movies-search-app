import { useEffect, useState } from "react";
import Slider from "react-slick";
import { getMovieByTitle } from "../api/omdb";

const FEATURED_TITLES = [
  "The Dark Knight",
  "Inception",
  "Avengers: Endgame",
  "Interstellar",
  "Joker"
];

const FeaturedMoviesCarousel = () => {
  const [featuredMovies, setFeaturedMovies] = useState([]);

  useEffect(() => {
    const fetchFeaturedMovies = async () => {
      const results = await Promise.all(
        FEATURED_TITLES.map(async (title) => await getMovieByTitle(title))
      );
      setFeaturedMovies(results.filter(Boolean));
    };

    fetchFeaturedMovies();
  }, []);

  const CustomPrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/60 dark:bg-white/40 hover:bg-black/80 p-2 rounded-full transition"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-white dark:text-black"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  );

  const CustomNextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/60 dark:bg-white/40 hover:bg-black/80 p-2 rounded-full transition"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-white dark:text-black"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
);

// Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-6">🎥 Featured Movies</h2>

      {featuredMovies.length === 0 ? (
        <p className="text-center text-gray-500">Loading featured movies...</p>
      ) : (
        <Slider {...settings}>
          {featuredMovies.map((movie, idx) => (
            <div key={idx} className="px-3">
              <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-80 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{movie.title} ({movie.year})</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">{movie.description}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default FeaturedMoviesCarousel;
