import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from "react-icons/fa";

const SeasonDetailPage = () => {
    const { seriesId, seasonNumber } = useParams();
    const [season, setSeason] = useState(null);

    useEffect(() => {
        const fetchSeasonDetails = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNumber}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
                setSeason(response.data);
            } catch (error) {
                console.error('Error fetching season details:', error);
            }
        };

        fetchSeasonDetails();
    }, [seriesId, seasonNumber]);

    if (!season) {
        return <div>Loading...</div>;
    }

    return (
        <div className="season-details">
            <figure >
                <img src={`https://image.tmdb.org/t/p/w500${season.poster_path}`} alt={season.name} className="season-detail--image" />
            </figure>
            <div className="season-details--main">
                <div className="season-info">
                    <h1 className="season-info--title">{season.name}</h1>
                    <div className="season-info--data">
                        <p>{season.air_date ? new Date(season.air_date).getFullYear() : ''}</p>
                        <p>{season.episodes.length} Episodes</p>
                    </div>
                    <p className="season-info--overview">{season.overview}</p>
                    <div>
                        <h2 style={{ paddingBottom: "20px" }}>Episodes</h2>
                        <div className="season-episodes">
                            {season.episodes.map(episode => (
                                <div key={episode.id} className="episode-card">
                                    <img src={`https://image.tmdb.org/t/p/w500${episode.still_path}`} alt={episode.name} className="episode-card--image" />
                                    <h5 className="episode-card--title">{episode.name}</h5>
                                    <p className="episode-card--overview">{episode.overview}</p>
                                    <p className="episode-card--rating">
                                        <FaStar style={{ color: "#FFD700" }} />
                                        {episode.vote_average.toFixed(1)}
                                    </p>
                                    <p className="episode-card--airdate">{episode.air_date}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SeasonDetailPage;
