// src/components/MovieCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from "react-icons/fa";

const MovieCard = ({ movie }) => {
    return (
        <div className="movie-card">
            <Link to={`/movie/${movie.id}`}>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="movie-card--image" />
                <div className="movie-card--info">
                    <h5 className="movie-card--title">{movie.title}</h5>
                    <div className="movie-card--detail">
                        <span style={{ display: "flex", justifyContent: "center" }}>
                            <FaStar style={{ color: "#FFD700", marginRight: "5px" }} />
                            {movie.vote_average.toFixed(1)}
                        </span>
                        <span className="movie-card--year">{new Date(movie.release_date).getFullYear()}</span>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default MovieCard;
