import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';

const MovieSlider = ({ title, fetchUrl, limit }) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(fetchUrl);
                setMovies(response.data.results || []);
            } catch (error) {
                console.error('Error fetching movies:', error);
                setMovies([]);
            }
        };

        fetchMovies();
    }, [fetchUrl]);

    const displayedMovies = limit ? movies.slice(0, limit) : movies;

    return (
        <div className="movie-slider">
            <h3 className="movie-slider--title">{title}</h3>
            <div className="movie-slider--container">
                {displayedMovies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default MovieSlider;
