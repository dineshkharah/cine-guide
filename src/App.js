import React, { useState, useEffect } from 'react';
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
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

import './App.css';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar user={user} handleLogout={handleLogout} />
        <div className="content">
          <Routes>
            <Route path="/" element={
              <>
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
              </>
            } />
            <Route path="/movie/:movieId" element={<MovieDetailPage />} />
            <Route path="/series/:seriesId/season/:seasonNumber" element={<SeasonDetailPage />} />
            <Route path="/series/:seriesId" element={<SeriesDetailPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/person/:personId" element={<PersonDetailPage />} />
            <Route path="/login" element={<LoginPage setUser={setUser} />} />
            <Route path="/register" element={<RegisterPage setUser={setUser} />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
