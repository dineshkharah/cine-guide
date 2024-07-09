import React from 'react';
import { Link } from 'react-router-dom';

const SeasonCard = ({ season, seriesId }) => {
    return (
        <div className="season-card">
            <Link to={`/series/${seriesId}/season/${season.season_number}`}>
                <img
                    src={`https://image.tmdb.org/t/p/w500${season.poster_path}`}
                    alt={season.name}
                    className="season-card--image"
                />
                <div className="season-card--info">
                    <h5 className="season-card--title">{season.name}</h5>
                    <p>{season.episode_count} Episodes</p>
                    <p>{season.air_date ? new Date(season.air_date).getFullYear() : ''}</p>
                </div>
            </Link>
        </div>
    );
};

export default SeasonCard;
