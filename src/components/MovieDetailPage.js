import React from 'react';
import { FaStar } from "react-icons/fa";
import { useParams, Link } from 'react-router-dom';
import MovieSlider from './MovieSlider';
import { Skeleton } from 'antd';
import LazyLoad from './LazyLoad';
import useFetch from '../hooks/useFetch';

const MovieDetailPage = () => {
    const { movieId } = useParams();
    const apiKey = process.env.REACT_APP_API_KEY;
    const similarUrl = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}&language=en-US&page=1`;

    const { data: movie, loading, error } = useFetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`
    );
    const { data: credits } = useFetch(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`
    );
    const { data: videos } = useFetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=en-US`
    );
    const { data: similar } = useFetch(similarUrl);

    if (error) {
        return <p className="load-error">Could not load this movie. Check your connection and try again.</p>;
    }

    if (loading || !movie || !credits) {
        return <Skeleton active paragraph={{ rows: 10 }} />;
    }

    const trailers = (videos?.results || []).slice(0, 4);
    const relatedMovies = similar?.results || [];
    const directors = credits.crew.filter(member => member.job === "Director");
    const actors = credits.cast.slice(0, 5);

    return (
        <div className="movie-details">
            <figure className="movie-detail--image">
                <LazyLoad skeletonType="image">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                </LazyLoad>
            </figure>
            <div className="movie-details--main">
                <div className="movie-info">
                    <LazyLoad skeletonType="title">
                        <h1 className="movie-info--title">{movie.title}</h1>
                    </LazyLoad>
                    <LazyLoad skeletonType="content">
                        <div className="movie-info--data">
                            <section className="movie-info--rating">
                                <FaStar style={{ color: "#FFD700" }} aria-hidden="true" />
                                <p>{movie.vote_average.toFixed(1)}</p>
                            </section>
                            <p>{movie.runtime}m</p>
                            <p>{new Date(movie.release_date).getFullYear()}</p>
                        </div>
                    </LazyLoad>
                    <LazyLoad skeletonType="content">
                        <p style={{ color: "#959499" }}>{movie.genres.map(genre => genre.name).join(', ')}</p>
                    </LazyLoad>
                    <LazyLoad skeletonType="contentdesc">
                        <p>{movie.overview}</p>
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
                    {directors.length > 0 && (
                        <LazyLoad skeletonType="content">
                            <p>
                                <span style={{ color: '#959499' }}>Directed By: </span>
                                {directors.map(director => (
                                    <Link key={director.id} to={`/person/${director.id}`} style={{ color: '#fff' }}>
                                        {director.name}
                                    </Link>
                                )).reduce((prev, curr) => [prev, ', ', curr])}
                            </p>
                        </LazyLoad>
                    )}
                </div>
                <div>
                    <h2>Clips and Trailers</h2>
                    <div className="movie-detail--trailerCard">
                        {trailers.length > 0 ? (
                            trailers.map(trailer => (
                                <div key={trailer.id}>
                                    <LazyLoad skeletonType="trailer">
                                        <iframe
                                            width="500"
                                            height="300"
                                            src={`https://www.youtube.com/embed/${trailer.key}`}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            title={trailer.name}
                                        ></iframe>
                                    </LazyLoad>
                                </div>
                            ))
                        ) : (
                            <p>No trailers available</p>
                        )}
                    </div>
                </div>
                {relatedMovies.length > 0 && (
                    <MovieSlider
                        fetchUrl={similarUrl}
                        title="You May Also Like"
                    />
                )}
            </div>
        </div>
    );
};

export default MovieDetailPage;
