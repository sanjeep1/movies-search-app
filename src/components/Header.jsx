import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaHeart, FaFilm, FaMoon, FaSun } from "react-icons/fa";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const navLinkClasses = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
    }`;

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold text-blue-600 dark:text-blue-400"
          >
            <FaFilm /> MovieFinder
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-4">
            <NavLink to="/" className={navLinkClasses}>
              Home
            </NavLink>
            <NavLink to="/favorites" className={navLinkClasses}>
              <FaHeart className="inline mr-1 text-red-500" /> Favorites
            </NavLink>

            {/* Toggle Switch */}
            <div
              onClick={toggleDarkMode}
              className="relative inline-flex items-center cursor-pointer"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              <input
                type="checkbox"
                checked={darkMode}
                onChange={toggleDarkMode}
                className="sr-only"
              />

              <div className="w-14 h-8 bg-gray-300 dark:bg-gray-600 rounded-full shadow-inner"></div>

              <div
                className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow transform transition-transform duration-300 ease-in-out
                  ${darkMode ? "translate-x-6" : "translate-x-0"}`}
              >
                {darkMode ? (
                  <FaMoon className="text-gray-800 dark:text-gray-200 m-auto mt-1" />
                ) : (
                  <FaSun className="text-yellow-400 m-auto mt-1" />
                )}
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-700 dark:text-gray-300"
          >
            {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-md px-4 py-4 space-y-2 rounded-b-md border-t border-gray-200 dark:border-gray-700">
            <NavLink
            to="/"
            className={navLinkClasses}
            onClick={() => setIsOpen(false)}
            >
            Home
            </NavLink>
            <NavLink
            to="/favorites"
            className={navLinkClasses}
            onClick={() => setIsOpen(false)}
            >
            <FaHeart className="inline mr-1 text-red-500" /> Favorites
            </NavLink>

            {/* Mobile toggle switch */}
            <div
            onClick={toggleDarkMode}
            className="mt-4 flex items-center justify-center cursor-pointer select-none"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
            <input
                type="checkbox"
                checked={darkMode}
                onChange={toggleDarkMode}
                className="sr-only"
            />
            <div className="w-14 h-8 bg-gray-300 dark:bg-gray-600 rounded-full shadow-inner relative">
                <div
                className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow transform transition-transform duration-300 ease-in-out
                    ${darkMode ? "translate-x-6" : "translate-x-0"}`}
                >
                {darkMode ? (
                    <FaMoon className="text-gray-800 dark:text-gray-200 m-auto mt-1" />
                ) : (
                    <FaSun className="text-yellow-400 m-auto mt-1" />
                )}
                </div>
            </div>
            </div>
        </div>
        )}
    </nav>
  );
};

export default Header;
