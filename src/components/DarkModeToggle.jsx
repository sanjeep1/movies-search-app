import { useTheme } from '../hooks/useTheme';

const DarkModeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 px-3 py-2 rounded bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow"
    >
      {darkMode ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
};

export default DarkModeToggle;