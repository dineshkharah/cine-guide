import React from 'react';
import { FaStar } from "react-icons/fa";
import { useParams, Link } from 'react-router-dom';
import SeriesSlider from './SeriesSlider';
import { Skeleton } from 'antd';
import LazyLoad from './LazyLoad';
import useFetch from '../hooks/useFetch';

const SeriesDetailPage = () => {
    const { seriesId } = useParams();
    const apiKey = process.env.REACT_APP_API_KEY;
    const similarUrl = `https://api.themoviedb.org/3/tv/${seriesId}/similar?api_key=${apiKey}&language=en-US&page=1`;

    const { data: series, loading, error } = useFetch(
        `https://api.themoviedb.org/3/tv/${seriesId}?api_key=${apiKey}&language=en-US`
    );
    const { data: credits } = useFetch(
        `https://api.themoviedb.org/3/tv/${seriesId}/credits?api_key=${apiKey}&language=en-US`
    );
    const { data: videos } = useFetch(
        `https://api.themoviedb.org/3/tv/${seriesId}/videos?api_key=${apiKey}&language=en-US`
    );
    const { data: similar } = useFetch(similarUrl);

    if (error) {
        return <p className="load-error">Could not load this series. Check your connection and try again.</p>;
    }

    if (loading || !series || !credits) {
        return <Skeleton active paragraph={{ rows: 10 }} />;
    }

    const trailers = (videos?.results || []).slice(0, 4);
    const relatedSeries = similar?.results || [];
    const actors = credits.cast.slice(0, 5);

    return (
        <div className="series-details">
            <figure className="series-detail--image">
                <LazyLoad skeletonType="image">
                    <img src={`https://image.tmdb.org/t/p/w500${series.poster_path}`} alt={`Poster of ${series.name}`} />
                </LazyLoad>
            </figure>
            <div className="series-details--main">
                <div className="series-info">
                    <LazyLoad skeletonType="title">
                        <h1 className="series-info--title">{series.name}</h1>
                    </LazyLoad>
                    <LazyLoad skeletonType="content">
                        <div className="series-info--data">
                            <section className="series-info--rating">
                                <FaStar style={{ color: "#FFD700" }} />
                                <p>{series.vote_average.toFixed(1)}</p>
                            </section>
                            <p>{series.number_of_seasons} Seasons</p>
                            <p>{series.first_air_date ? new Date(series.first_air_date).getFullYear() : ''}</p>
                        </div>
                    </LazyLoad>
                    <LazyLoad skeletonType="content">
                        <p style={{ color: "#959499" }}>{series.genres.map(genre => genre.name).join(', ')}</p>
                    </LazyLoad>
                    <LazyLoad skeletonType="contentdesc">
                        <p>{series.overview}</p>
                    </LazyLoad>
                    {actors.length > 0 && (
                        <LazyLoad skeletonType="content">
                            <p>
                                <span style={{ color: '#959499' }}>Starring: </span>
                                {actors.map(actor => (
                                    <Link key={actor.id} to={`/person/${actor.id}`} style={{ color: '#fff' }}>
                                        {actor.name}
                                    </Link>
                                )).reduce((prev, curr) => [prev, ', ', curr])}
                            </p>
                        </LazyLoad>
                    )}
                </div>
                <div>
                    <h2>Clips and Trailers</h2>
                    <div className="series-detail--trailerCard">
                        {trailers.length > 0 ? (
                            trailers.map(trailer => (
                                <div key={trailer.id}>
                                    <LazyLoad skeletonType="trailer">
                                        <iframe
                                            src={`https://www.youtube.com/embed/${trailer.key}`}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            title={`Trailer: ${trailer.name}`}
                                        ></iframe>
                                    </LazyLoad>
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
                            <LazyLoad key={season.id} skeletonType="card">
                                <Link to={`/series/${seriesId}/season/${season.season_number}`} className="season-card">
                                    <figure>
                                        <img
                                            className="season-card--image"
                                            src={`https://image.tmdb.org/t/p/w500${season.poster_path}`}
                                            alt={`Poster of ${season.name}`}
                                        />
                                    </figure>
                                    <div className="season-card--info">
                                        <h3 className="season-card--title">{season.name}</h3>
                                        <p>{season.episode_count} Episodes</p>
                                        <p>{season.air_date ? new Date(season.air_date).getFullYear() : ''}</p>
                                    </div>
                                </Link>
                            </LazyLoad>
                        ))}
                    </div>
                </div>
                {relatedSeries.length > 0 && (
                    <SeriesSlider
                        fetchUrl={similarUrl}
                        title="You May Also Like"
                    />
                )}
            </div>
        </div>
    );
};

export default SeriesDetailPage;
