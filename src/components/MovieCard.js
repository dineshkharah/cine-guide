// src/components/MovieCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from "react-icons/fa";


const MovieCard = ({ movie }) => {
    return (
        <div className="movie-card">
            <Link to={`/${movie.id}`}>
                <img src={process.env.PUBLIC_URL + '/' + movie.isVertical} alt={movie.title} className="movie-card--image" />
                <div className="movie-card--info">
                    <h5 className="movie-card--title">{movie.title}</h5>
                    <div className='movie-card--detail'>
                        <span style={{ display: "flex", justifyContent: "center" }}>
                            <FaStar style={{ color: "#FFD700", marginRight: "5px" }} />
                            {movie.rating}
                        </span>
                        <span className='movie-card--year'>{movie.year}</span>
                    </div>

                </div>
            </Link>
        </div>
    );
};

export default MovieCard;
