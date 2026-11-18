import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CiCircleMore } from "react-icons/ci";
import useFetch from '../hooks/useFetch';
import { imageUrl, formatRating, formatYear } from '../utils/tmdb';

const SLIDE_INTERVAL = 10000;
const POPULAR_URL = `https://api.themoviedb.org/3/discover/movie?language=en-US&page=1&sort_by=popularity.desc&api_key=${process.env.REACT_APP_API_KEY}`;
const GENRES_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;

const Carousel = () => {
    const { data: popular, error } = useFetch(POPULAR_URL);
    const { data: genreData } = useFetch(GENRES_URL);
    const [activeIndex, setActiveIndex] = useState(0);

    const carouselData = (popular?.results || []).slice(0, 10);
    const slideCount = carouselData.length;

    // Turn the list of genres into a lookup of id to name.
    const genreNameById = {};
    (genreData?.genres || []).forEach((genre) => {
        genreNameById[genre.id] = genre.name;
    });

    // Move to the next slide on a timer.
    // The update uses a function so activeIndex is not a dependency here.
    // If it were, the timer would restart on every slide change.
    useEffect(() => {
        if (slideCount <= 1) {
            return undefined;
        }

        const timer = setInterval(() => {
            setActiveIndex(current => (current + 1) % slideCount);
        }, SLIDE_INTERVAL);

        return () => clearInterval(timer);
    }, [slideCount]);

    // Works both ways, so going back from the first slide lands on the last one.
    const goToSlide = (index) => {
        if (slideCount === 0) {
            return;
        }
        setActiveIndex(((index % slideCount) + slideCount) % slideCount);
    };

    const mapGenreNames = (genreIds) =>
        genreIds.map(id => genreNameById[id]).filter(Boolean).join(', ');

    if (error) {
        return <p className="load-error">Could not load the featured movies. Check your connection and try again.</p>;
    }

    return (
        <div className="carousel-container">
            <div id="carousel" className="carousel">
                <div className="carousel-inner">
                    {carouselData.map((movie, index) => (
                        <div
                            className={`carousel-item ${index === activeIndex ? 'active' : ''}`}
                            key={movie.id}
                            aria-hidden={index !== activeIndex}
                        >
                            <img src={imageUrl(movie.backdrop_path)} className="carousel-image" alt={movie.title} />
                            <div className="carousel-caption">
                                <div className="overlay-text">
                                    <h3 className="carousel-title">{movie.title}</h3>
                                    <div className="carousel-meta carousel-text">
                                        <p className="carousel-year">{formatYear(movie.release_date)}</p>
                                        <p className="carousel-rating">{formatRating(movie.vote_average)}</p>
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

                {slideCount > 1 && (
                    <>
                        <div className="carousel-indicators">
                            {carouselData.map((movie, index) => (
                                <button
                                    type="button"
                                    onClick={() => goToSlide(index)}
                                    className={index === activeIndex ? 'active' : ''}
                                    aria-current={index === activeIndex ? 'true' : 'false'}
                                    aria-label={`Slide ${index + 1}`}
                                    key={movie.id}
                                ></button>
                            ))}
                        </div>
                        <button
                            className="carousel-control-prev"
                            type="button"
                            onClick={() => goToSlide(activeIndex - 1)}
                            aria-label="Previous slide"
                        >
                            <svg width="15" height="23" viewBox="0 0 15 23" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path d="m14.8 2.675-9.148 8.71 9.148 8.708-2.816 2.676L0 11.384 11.984 0 14.8 2.675Z" fill="currentColor"></path>
                            </svg>
                        </button>
                        <button
                            className="carousel-control-next"
                            type="button"
                            onClick={() => goToSlide(activeIndex + 1)}
                            aria-label="Next slide"
                        >
                            <svg width="16" height="23" viewBox="0 0 16 23" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path d="m.5 20.094 9.147-8.71L.5 2.677 3.316 0 15.3 11.385 3.316 22.769.5 20.094Z" fill="currentColor"></path>
                            </svg>
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Carousel;
