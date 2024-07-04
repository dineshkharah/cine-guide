import React, { useEffect, useState } from 'react';
import { FaStar } from "react-icons/fa";
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import MovieSlider from './MovieSlider';
import SeriesSlider from './SeriesSlider';

const SeriesDetailPage = () => {
    const { seriesId } = useParams();
    const [series, setSeries] = useState(null);
    const [credits, setCredits] = useState(null);
    const [trailers, setTrailers] = useState([]);
    const [relatedSeries, setRelatedSeries] = useState([]);

    useEffect(() => {
        const fetchSeriesDetails = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/tv/${seriesId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
                setSeries(response.data);
            } catch (error) {
                console.error('Error fetching series details:', error);
            }
        };

        const fetchSeriesCredits = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/tv/${seriesId}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
                setCredits(response.data);
            } catch (error) {
                console.error('Error fetching series credits:', error);
            }
        };

        const fetchSeriesTrailers = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/tv/${seriesId}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
                setTrailers(response.data.results.slice(0, 4));
            } catch (error) {
                console.error('Error fetching series trailers:', error);
            }
        };

        const fetchRelatedSeries = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/tv/${seriesId}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
                setRelatedSeries(response.data.results);
            } catch (error) {
                console.error('Error fetching related series:', error);
            }
        };

        fetchSeriesDetails();
        fetchSeriesCredits();
        fetchSeriesTrailers();
        fetchRelatedSeries();
    }, [seriesId]);

    if (!series || !credits) {
        return <div>Loading...</div>;
    }

    const actors = credits.cast.slice(0, 5);

    return (
        <div className="series-details">
            <figure className="series-detail--image">
                <img src={`https://image.tmdb.org/t/p/w500${series.poster_path}`} alt={series.name} />
            </figure>
            <div className="series-details--main">
                <div className="series-info">
                    <h1 className="series-info--title">{series.name}</h1>
                    <div className="series-info--data">
                        <section className="series-info--rating">
                            <FaStar style={{ color: "#FFD700" }} />
                            <p>{series.vote_average.toFixed(1)}</p>
                        </section>
                        <p>{series.number_of_seasons} Seasons</p>
                        <p>{series.first_air_date ? new Date(series.first_air_date).getFullYear() : ''}</p>
                    </div>
                    <p style={{ color: "#959499" }}>{series.genres.map(genre => genre.name).join(', ')}</p>
                    <p>{series.overview}</p>
                    {actors.length > 0 && (
                        <p>
                            <span style={{ color: '#959499' }}>Starring: </span>
                            {actors.map(actor => (
                                <Link key={actor.id} to={`/person/${actor.id}`} style={{ color: '#fff' }}>
                                    {actor.name}
                                </Link>
                            )).reduce((prev, curr) => [prev, ', ', curr])}
                        </p>
                    )}
                </div>
                <div>
                    <h2>Clips and Trailers</h2>
                    <div className="series-detail--trailerCard">
                        {trailers.length > 0 ? (
                            trailers.map(trailer => (
                                <div key={trailer.id}>
                                    <iframe
                                        width="500"
                                        height="300"
                                        src={`https://www.youtube.com/embed/${trailer.key}`}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title={trailer.name}
                                    ></iframe>
                                </div>
                            ))
                        ) : (
                            <p>No trailers available</p>
                        )}
                    </div>
                </div>
                <div>
                    <h2>Seasons</h2>
                    <div className="season-grid">
                        {series.seasons.map(season => (
                            <Link key={season.id} to={`/series/${seriesId}/season/${season.season_number}`} className="season-card">
                                <figure>
                                    <img
                                        className="season-card--image"
                                        src={`https://image.tmdb.org/t/p/w500${season.poster_path}`}
                                        alt={season.name}
                                    />
                                </figure>
                                <div className="season-card--info">
                                    <h3 className="season-card--title">{season.name}</h3>
                                    <p>{season.episode_count} Episodes</p>
                                    <p>{season.air_date ? new Date(season.air_date).getFullYear() : ''}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                {relatedSeries.length > 0 && (
                    <div>
                        <h2>You May Also Like</h2>
                        <MovieSlider
                            fetchUrl={`https://api.themoviedb.org/3/tv/${seriesId}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`}
                            title=""
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default SeriesDetailPage;
