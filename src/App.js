import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import MovieDetailPage from './components/MovieDetailPage';
import SeriesDetailPage from './components/SeriesDetailPage';
import MovieSlider from './components/MovieSlider';
import SeriesSlider from './components/SeriesSlider';
import SearchPage from './components/SearchPage';
import PersonDetailPage from './components/PersonDetailPage';
import SeasonDetailPage from './components/SeasonDetailPage';

import './App.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<>
          <Carousel />
          <MovieSlider
            title="Latest Movies"
            fetchUrl={`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`}
          />
          <SeriesSlider
            title="Latest TV Series"
            fetchUrl={`https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`}
          />
          <MovieSlider
            title="Action Movies"
            fetchUrl={`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=28&language=en-US&page=1`}
          />
          <SeriesSlider
            title="Action TV Series"
            fetchUrl={`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&with_genres=10759&language=en-US&page=1`}
          />
        </>} />
        <Route path="/movie/:movieId" element={<MovieDetailPage />} />
        <Route path="/series/:seriesId/season/:seasonNumber" element={<SeasonDetailPage />} />
        <Route path="/series/:seriesId" element={<SeriesDetailPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/person/:personId" element={<PersonDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
