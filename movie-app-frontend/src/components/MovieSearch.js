// src/components/MovieSearch.js
import React, { useState } from 'react';

const MovieSearch = () => {
  const [title, setTitle] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = () => {
    if (!title) {
      setError('Please enter a movie title');
      return;
    }

    setError('');
    fetch(`https://movie-app-j1xq.onrender.com/api/movies/search?title=${title}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Search results:', data); // Log the API response
        setMovies(data);
      })
      .catch(error => {
        console.error('Error searching movies:', error);
        setError('Error fetching search results');
      });
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter movie title"
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <img src={movie.banner_image} alt={movie.title} style={{ width: '100px' }} />
            <p>{movie.title} ({movie.year}) - {movie.genre}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieSearch;
