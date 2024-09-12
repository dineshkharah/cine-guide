import React, { useEffect, useState, useCallback } from 'react';
import { FaStar } from "react-icons/fa";
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import MovieSlider from './MovieSlider';
import { Skeleton, Button, Modal } from 'antd';
import LazyLoad from './LazyLoad';

const MovieDetailPage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [credits, setCredits] = useState(null);
    const [trailers, setTrailers] = useState([]);
    const [relatedMovies, setRelatedMovies] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const fetchMovieDetails = useCallback(async () => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
            setMovie(response.data);
        } catch (error) {
            console.error('Error fetching movie details:', error);
        }
    }, [movieId]);

    const fetchMovieCredits = useCallback(async () => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
            setCredits(response.data);
        } catch (error) {
            console.error('Error fetching movie credits:', error);
        }
    }, [movieId]);

    const fetchMovieTrailers = useCallback(async () => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
            setTrailers(response.data.results.slice(0, 4));
        } catch (error) {
            console.error('Error fetching movie trailers:', error);
        }
    }, [movieId]);

    const fetchRelatedMovies = useCallback(async () => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
            setRelatedMovies(response.data.results);
        } catch (error) {
            console.error('Error fetching related movies:', error);
        }
    }, [movieId]);

    useEffect(() => {
        fetchMovieDetails();
        fetchMovieCredits();
        fetchMovieTrailers();
        fetchRelatedMovies();
    }, [movieId, fetchMovieDetails, fetchMovieCredits, fetchMovieTrailers, fetchRelatedMovies]);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    }

    if (!movie || !credits) {
        return <Skeleton active paragraph={{ rows: 10 }} />;
    }

    const directors = credits.crew.filter(member => member.job === "Director");
    const actors = credits.cast.slice(0, 5);

    return (
        <div className="movie-details">
            <figure className="movie-detail--image">
                <LazyLoad skeletonType="image">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                </LazyLoad>
                <Button onClick={showModal} style={{ backgroundColor: "rgb(26 26 78)" }} type='primary' > Add to List</Button>
                <Modal title="Add to List" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <p>List of lists </p>
                </Modal>
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
                    <div>
                        <h2>You May Also Like</h2>
                        <MovieSlider
                            fetchUrl={`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`}
                            title=""
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default MovieDetailPage;
