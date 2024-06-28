import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import MovieDetailPage from './components/MovieDetailPage';
import MovieSlider from './components/MovieSlider';
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
          <MovieSlider
            title="Action Movies"
            fetchUrl={`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=28&language=en-US&page=1`}
          />
          <MovieSlider
            title="Comedy Movies"
            fetchUrl={`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=35&language=en-US&page=1`}
          />
        </>} />
        <Route path="/movie/:movieId" element={<MovieDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;
