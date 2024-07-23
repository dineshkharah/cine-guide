import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

const MovieSlider = ({ title, fetchUrl, limit }) => {
    const [movies, setMovies] = useState([]);
    const containerRef = useRef(null);

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

    const scrollLeft = () => {
        containerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    };

    const scrollRight = () => {
        containerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    };

    return (
        <div className="movie-slider">
            <div className="movie-slider--header">
                <h3 className="movie-slider--title">{title}</h3>
                <div className="movie-slider--controls">
                    <button className="movie-slider--button" onClick={scrollLeft}>
                        <IoIosArrowDropleft />
                    </button>
                    <button className="movie-slider--button" onClick={scrollRight}>
                        <IoIosArrowDropright />
                    </button>
                </div>
            </div>
            <div className="movie-slider--container" ref={containerRef}>
                {displayedMovies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default MovieSlider;
