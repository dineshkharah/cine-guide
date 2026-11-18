import React, { useRef } from 'react';
import SeriesCard from './SeriesCard';
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import useFetch from '../hooks/useFetch';

const SeriesSlider = ({ title, fetchUrl, limit }) => {
    const { data, error } = useFetch(fetchUrl);
    const containerRef = useRef(null);

    const series = data?.results || [];
    const displayedSeries = limit ? series.slice(0, limit) : series;

    const scroll = (direction) => {
        const scrollAmount = direction === 'left' ? -200 : 200;
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="movie-slider">
            <div className="movie-slider--header">
                <h3 className="movie-slider--title">{title}</h3>
                <div className="movie-slider--controls">
                    <button className="movie-slider--button" onClick={() => scroll('left')} aria-label="Scroll left">
                        <IoIosArrowDropleft />
                    </button>
                    <button className="movie-slider--button" onClick={() => scroll('right')} aria-label="Scroll right">
                        <IoIosArrowDropright />
                    </button>
                </div>
            </div>
            {error ? (
                <p className="load-error">Could not load these titles. Check your connection and try again.</p>
            ) : (
                <div className="movie-slider--container" ref={containerRef}>
                    {displayedSeries.map(serie => (
                        <SeriesCard key={serie.id} series={serie} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SeriesSlider;
