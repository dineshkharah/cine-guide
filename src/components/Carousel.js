import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CiCircleMore } from "react-icons/ci";
import axios from 'axios';

const Carousel = () => {
    const [carouselData, setCarouselData] = useState([]);
    const [genres, setGenres] = useState({});

    useEffect(() => {
        const getCarouselMovie = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?language=en-US&page=1&sort_by=popularity.desc&api_key=${process.env.REACT_APP_API_KEY}`);
                setCarouselData(response.data.results.slice(0, 10));
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        const getGenres = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
                const genresArray = response.data.genres;
                const genresObject = {};
                genresArray.forEach(genre => {
                    genresObject[genre.id] = genre.name;
                });
                setGenres(genresObject);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };

        getCarouselMovie();
        getGenres();
    }, []);

    const mapGenreNames = (genreIds) => genreIds.map(id => genres[id]).join(', ');

    return (
        <div className="container">
            <div id="carousel" className="carousel slide carousel-dark arrows-outside" data-bs-ride="carousel" data-bs-interval="10000">
                <div className="carousel-inner">
                    {carouselData.map((movie, index) => (
                        <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={movie.id}>
                            <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} className="carousel-image" alt={movie.title} />
                            <div className="carousel-caption d-block position-absolute top-0 start-0 w-100 h-100">
                                <div className="overlay-text p-3">
                                    <h3 className="carousel-title">{movie.title}</h3>
                                    <div className="d-flex carousel-text">
                                        <p className="carousel-year">{new Date(movie.release_date).getFullYear()}</p>
                                        <p className="carousel-rating">{movie.vote_average.toFixed(1)}</p>
                                    </div>
                                    <p className="carousel-text">{mapGenreNames(movie.genre_ids)}</p>
                                    <p className="carousel-description carousel-text">{movie.overview}</p>
                                    <Link to={`/movie/${movie.id}`} className="carousel-btn">
                                        <CiCircleMore className="carousel-icon" />
                                        <span>More Info</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="carousel-indicators">
                    {carouselData.map((movie, index) => (
                        <button
                            type="button"
                            data-bs-target="#carousel"
                            data-bs-slide-to={index}
                            className={index === 0 ? 'active' : ''}
                            aria-current={index === 0 ? 'true' : 'false'}
                            aria-label={`Slide ${index + 1}`}
                            key={movie.id}
                        ></button>
                    ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
                    <svg width="15" height="23" viewBox="0 0 15 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="m14.8 2.675-9.148 8.71 9.148 8.708-2.816 2.676L0 11.384 11.984 0 14.8 2.675Z" fill="currentColor"></path>
                    </svg>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
                    <svg width="16" height="23" viewBox="0 0 16 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="m.5 20.094 9.147-8.71L.5 2.677 3.316 0 15.3 11.385 3.316 22.769.5 20.094Z" fill="currentColor"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Carousel;
