import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SeriesCard from './SeriesCard';

const SeriesSlider = ({ title, fetchUrl, limit }) => {
    const [series, setSeries] = useState([]);

    useEffect(() => {
        const fetchSeries = async () => {
            try {
                const response = await axios.get(fetchUrl);
                // console.log(response.data.results, "slider")
                setSeries(response.data.results || []);
            } catch (error) {
                console.error('Error fetching series:', error);
                setSeries([]);
            }
        };

        fetchSeries();
    }, [fetchUrl]);

    const displayedSeries = limit ? series.slice(0, limit) : series;

    return (
        <div className="movie-slider">
            <h3 className="movie-slider--title">{title}</h3>
            <div className="movie-slider--container">
                {displayedSeries.map(serie => (
                    <SeriesCard key={serie.id} series={serie} />
                ))}
            </div>
        </div>
    );
};

export default SeriesSlider;
