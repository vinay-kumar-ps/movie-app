// src/App.js
import React, { useState } from 'react';
import MovieSearch from './components/MovieSearch';
import MovieList from './components/MovieList';
import './App.css';  // Import the CSS file

const App = () => {
  const [movies, setMovies] = useState([]);

  const handleSearch = async (title) => {
    try {
      const response = await fetch(`https://movie-app-j1xq.onrender.com/api/movies/search?title=${title}`);
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  return (
    <div className="app-container">
      <MovieSearch onSearch={handleSearch} />
      <MovieList movies={movies} />
    </div>
  );
};

export default App;
