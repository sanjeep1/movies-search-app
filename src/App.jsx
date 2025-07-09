import { useEffect } from 'react';
import { searchMovies } from './api/omdb';

function App() {
  
  useEffect(() => {
    searchMovies('batman').then(console.log);
  }, []);

  return (
    <>
    <h1 className='font-bold flex justify-center'>Movie Search App</h1>
    <div className="p-4">Check console for API response</div>;
    </>
  )
}

export default App
