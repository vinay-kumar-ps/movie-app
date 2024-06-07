import React from 'react';
import MovieSearch from './MovieSearch';
import MovieList from './MovieList';
import Logo from './Logo';
import FavoritesButton from './FavoritesButton';
import BigImage from './BigImage';

const HomePage = () => {
  return (
    <div className="home-page">
      <Logo />
      <FavoritesButton />
      <MovieSearch />
      <BigImage />
      <MovieList />
    </div>
  );
};

export default HomePage;
