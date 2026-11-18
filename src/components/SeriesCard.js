import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import LazyLoad from './LazyLoad';
import { imageUrl, formatRating, formatYear } from '../utils/tmdb';

const SeriesCard = ({ series }) => {
    return (
        <LazyLoad skeletonType="card">
            <div className="series-card">
                <Link to={`/series/${series.id}`}>
                    <img src={imageUrl(series.poster_path)} alt={`Poster of ${series.name}`} className="series-card--image" />
                    <div className="series-card--info">
                        <h5 className="series-card--title">(S) {series.name}</h5>
                        <div className="series-card--detail">
                            <span style={{ display: "flex", justifyContent: "center" }}>
                                <FaStar style={{ color: "#FFD700", marginRight: "5px" }} />
                                {formatRating(series.vote_average)}
                            </span>
                            <span className="series-card--year">{formatYear(series.first_air_date)}</span>
                        </div>
                    </div>
                </Link>
            </div>
        </LazyLoad>
    );
};

export default SeriesCard;
