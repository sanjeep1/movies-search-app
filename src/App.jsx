import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetailPage from './pages/MovieDetailPage';
import DarkModeToggle from './components/DarkModeToggle';

function App() {
  
  return (
    <>
    <DarkModeToggle />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetailPage />} />
    </Routes>
    </>
  )
}

export default App
