import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import LazyLoad from './LazyLoad';
import { imageUrl, formatRating, formatYear } from '../utils/tmdb';

const MovieCard = ({ movie }) => {
    const title = movie.title || movie.name; // Use title for movies and name for TV series
    return (
        <LazyLoad skeletonType="card">
            <div className="movie-card">
                <Link to={`/movie/${movie.id}`}>
                    <img src={imageUrl(movie.poster_path)} alt={`Poster of ${title}`} className="movie-card--image" />
                    <div className="movie-card--info">
                        <h5 className="movie-card--title">{title}</h5>
                        <div className="movie-card--detail">
                            <span style={{ display: "flex", justifyContent: "center" }}>
                                <FaStar style={{ color: "#FFD700", marginRight: "5px" }} />
                                {formatRating(movie.vote_average)}
                            </span>
                            <span className="movie-card--year">{formatYear(movie.release_date || movie.first_air_date)}</span>
                        </div>
                    </div>
                </Link>
            </div>
        </LazyLoad>
    );
};

export default MovieCard;
