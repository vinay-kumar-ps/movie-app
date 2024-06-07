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
      <h1>Get Movies</h1>
      <div className="search-container">
        <div className="search-form">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter movie title"
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">Search</button>
        </div>
        {error && <p className="error">{error}</p>}
      </div>
      <div className='image-container'>
        <img src="https://s3-alpha-sig.figma.com/img/2b9c/8d80/f26d1c5b3d0cfeb1d76ba2b1e6579b99?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=emxkjfb8bk51ZJgW5FTiqJErsSEbKDm1KM04RJMSfRC5vvbmHZd6ohpLaWbnElTJHcgxBH63mM0J7xFUOsU-R0I424oKsPAb0E1wQsN03hOQy1QB2GKGg~Y1vUqYE4RVecvxgI3PdhowE7AEFRopPhtt1IyByD7i7ulbzruefC22DAdEiK~76uailyUNkQQujRk8yl06fjLFJ7d~otupwmxYgVrEzwXYeqZ6yKzAlFrbMqAUhT~sFq6lVH1BhPu4PL9pv5ZMDNS2m260A813CzpYdhCkUtoyZ-lUwloCdtoC16RIaP1JtRtEGVbR2M9O~enIRY3kmrJamwhkmF~NOQ__" alt="Get" className='image' />
        <div className='text'>Spider-Man : Into The Spider Verse Spider-Man: Across the Spider-Verse," now zipping into the theater-verse, is the long-awaited follow-up to 2018's "Spider-Man: Into the Spider-Verse," a revelatory thrill ride that deservedly won the Oscar for animation.</div>
      </div>
      <ul className="movie-list">
        {movies.map(movie => (
          <li key={movie.id} className="movie-item">
            <img src={movie.banner_image} alt={movie.title} className='movie-image' />
            <div className="details">
              <h2>{movie.title}</h2>
              <p>({movie.year}) - {movie.genre}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieSearch;
