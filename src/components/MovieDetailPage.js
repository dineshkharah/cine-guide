import React, { useEffect, useState } from 'react';
import { FaStar } from "react-icons/fa";
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import MovieSlider from './MovieSlider';

const MovieDetailPage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [credits, setCredits] = useState(null);
    const [trailers, setTrailers] = useState([]);
    const [relatedMovies, setRelatedMovies] = useState([]);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
                setMovie(response.data);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        const fetchMovieCredits = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
                setCredits(response.data);
            } catch (error) {
                console.error('Error fetching movie credits:', error);
            }
        };

        const fetchMovieTrailers = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
                setTrailers(response.data.results.slice(0, 4));
            } catch (error) {
                console.error('Error fetching movie trailers:', error);
            }
        };

        const fetchRelatedMovies = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
                setRelatedMovies(response.data.results);
            } catch (error) {
                console.error('Error fetching related movies:', error);
            }
        };

        fetchMovieDetails();
        fetchMovieCredits();
        fetchMovieTrailers();
        fetchRelatedMovies();
    }, [movieId]);

    if (!movie || !credits) {
        return <div>Loading...</div>;
    }

    const directors = credits.crew.filter(member => member.job === "Director");
    const actors = credits.cast.slice(0, 5);

    return (
        <div className="movie-details">
            <figure className="movie-detail--image">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            </figure>
            <div className="movie-details--main">
                <div className="movie-info">
                    <h1 className="movie-info--title">{movie.title}</h1>
                    <div className="movie-info--data">
                        <section className="movie-info--rating">
                            <FaStar style={{ color: "#FFD700" }} />
                            <p>{movie.vote_average.toFixed(1)}</p>
                        </section>
                        <p>{movie.runtime}m</p>
                        <p>{new Date(movie.release_date).getFullYear()}</p>
                    </div>
                    <p style={{ color: "#959499" }}>{movie.genres.map(genre => genre.name).join(', ')}</p>
                    <p>{movie.overview}</p>
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
                    {directors.length > 0 && (
                        <p>
                            <span style={{ color: '#959499' }}>Directed By: </span>
                            {directors.map(director => (
                                <Link key={director.id} to={`/person/${director.id}`} style={{ color: '#fff' }}>
                                    {director.name}
                                </Link>
                            )).reduce((prev, curr) => [prev, ', ', curr])}
                        </p>
                    )}
                </div>
                <div>
                    <h2>Clips and Trailers</h2>
                    <div className="movie-detail--trailerCard">
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
                    <h2>You May Also Like</h2>
                    <MovieSlider
                        fetchUrl={`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`}

                    />
                </div>
            </div>
        </div>
    );
};

export default MovieDetailPage;
