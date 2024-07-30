import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import SeriesCard from './SeriesCard';
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

const SeriesSlider = ({ title, fetchUrl, limit }) => {
    const [series, setSeries] = useState([]);
    const containerRef = useRef(null);

    useEffect(() => {
        const fetchSeries = async () => {
            try {
                const response = await axios.get(fetchUrl);
                setSeries(response.data.results || []);
            } catch (error) {
                console.error('Error fetching series:', error);
                setSeries([]);
            }
        };

        fetchSeries();
    }, [fetchUrl]);

    const displayedSeries = limit ? series.slice(0, limit) : series;

    const scrollLeft = () => {
        containerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    };

    const scrollRight = () => {
        containerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    };

    return (
        <div className="movie-slider">
            <div className="movie-slider--header">
                <h3 className="movie-slider--title">{title}</h3>
                <div className="movie-slider--controls">
                    <button className="movie-slider--button" onClick={scrollLeft}>
                        <IoIosArrowDropleft />
                    </button>
                    <button className="movie-slider--button" onClick={scrollRight}>
                        <IoIosArrowDropright />
                    </button>
                </div>
            </div>
            <div className="movie-slider--container" ref={containerRef}>
                {displayedSeries.map(serie => (
                    <SeriesCard key={serie.id} series={serie} />
                ))}
            </div>
        </div>
    );
};

export default SeriesSlider;
