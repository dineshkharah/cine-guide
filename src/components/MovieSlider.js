import React, { useRef } from 'react';
import MovieCard from './MovieCard';
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import useFetch from '../hooks/useFetch';

const MovieSlider = ({ title, fetchUrl, limit }) => {
    const { data, error } = useFetch(fetchUrl);
    const containerRef = useRef(null);

    const movies = data?.results || [];
    const displayedMovies = limit ? movies.slice(0, limit) : movies;

    const scroll = (direction) => {
        const scrollAmount = direction === 'left' ? -200 : 200;
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="movie-slider">
            <div className="movie-slider--header">
                <h3 className="movie-slider--title">{title}</h3>
                <div className="movie-slider--controls">
                    <button className="movie-slider--button" onClick={() => scroll('left')} aria-label="Scroll left">
                        <IoIosArrowDropleft />
                    </button>
                    <button className="movie-slider--button" onClick={() => scroll('right')} aria-label="Scroll right">
                        <IoIosArrowDropright />
                    </button>
                </div>
            </div>
            {error ? (
                <p className="load-error">Could not load these titles. Check your connection and try again.</p>
            ) : (
                <div className="movie-slider--container" ref={containerRef}>
                    {displayedMovies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MovieSlider;
