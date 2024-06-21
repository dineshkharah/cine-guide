import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import MovieDetailPage from './components/MovieDetailPage';
import movieData from './components/tempData2';
import carouselData from './components/tempData1';
import './App.css';
import MovieSlider from './components/MovieSlider';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<>
          <Carousel data={carouselData} />
          <MovieSlider title="Latest Movies" movies={Object.values(movieData).slice(0, 10)} />
          <MovieSlider title="Action Movies" movies={Object.values(movieData).filter(movie => movie.genre.includes('Action'))} />
          <MovieSlider title="Comedy Movies" movies={Object.values(movieData).filter(movie => movie.genre.includes('Comedy'))} />
        </>} />
        <Route path="/:movieId" element={<MovieDetailPage data={movieData} />} />
      </Routes>
    </Router>
  );
};

export default App;
