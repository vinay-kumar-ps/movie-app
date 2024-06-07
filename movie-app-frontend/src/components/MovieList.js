// src/components/MovieList.js
import React, { useEffect, useState } from 'react';

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('https://movie-app-j1xq.onrender.com/api/movies')
      .then(response => response.json())
      .then(data => setMovies(data))
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  return (
    <div>
      <h1>Movie List</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <img src={movie.banner_image} alt={movie.title} />
            <p>{movie.title} ({movie.year}) - {movie.genre}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
