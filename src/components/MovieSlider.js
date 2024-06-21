import React from 'react';
import MovieCard from './MovieCard';

const MovieSlider = ({ movies, title }) => {
    return (
        <div className="movie-slider">
            <h3 className='movie-slider--title'>{title}</h3>
            <div className="movie-slider--container">
                {movies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default MovieSlider;
