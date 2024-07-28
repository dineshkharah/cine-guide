import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import LazyLoad from './LazyLoad';

const SeriesCard = ({ series }) => {
    return (
        <LazyLoad skeletonType="card">
            <div className="series-card">
                <Link to={`/series/${series.id}`}>
                    <img src={`https://image.tmdb.org/t/p/w500${series.poster_path}`} alt={series.name} className="series-card--image" />
                    <div className="series-card--info">
                        <h5 className="series-card--title">(S) {series.name}</h5>
                        <div className="series-card--detail">
                            <span style={{ display: "flex", justifyContent: "center" }}>
                                <FaStar style={{ color: "#FFD700", marginRight: "5px" }} />
                                {series.vote_average.toFixed(1)}
                            </span>
                            <span className="series-card--year">{new Date(series.first_air_date).getFullYear()}</span>
                        </div>
                    </div>
                </Link>
            </div>
        </LazyLoad>
    );
};

export default SeriesCard;
