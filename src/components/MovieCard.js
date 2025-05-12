// src/components/MovieCard.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import LazyLoad from './LazyLoad';
import { Button } from 'antd';
import AddToListModal from './AddToListModal';

const MovieCard = ({ movie }) => {
    const title = movie.title || movie.name;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [lists, setLists] = useState([
        { id: 1, name: 'Favorites', containsMedia: false },
        { id: 2, name: 'Watch Later', containsMedia: true },
    ]);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onAddOrRemoveMedia = (list) => {
        const updatedLists = lists.map(l =>
            l.id === list.id ? { ...l, containsMedia: !l.containsMedia } : l
        );
        setLists(updatedLists);
    };

    return (
        <LazyLoad skeletonType="card">
            <div className="movie-card">
                <Link to={`/movie/${movie.id}`}>
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`Poster of ${title}`} className="movie-card--image" />
                    <div className="movie-card--info">
                        <h5 className="movie-card--title">{title}</h5>
                        <div className="movie-card--detail">
                            <span style={{ display: "flex", justifyContent: "center" }}>
                                <FaStar style={{ color: "#FFD700", marginRight: "5px" }} />
                                {movie.vote_average.toFixed(1)}
                            </span>
                            <span className="movie-card--year">{new Date(movie.release_date || movie.first_air_date).getFullYear()}</span>
                        </div>
                    </div>
                </Link>
                <Button onClick={showModal} type="primary" style={{ backgroundColor: "rgb(26 26 78)" }}>Add to List</Button>

                {/* Reusable AddToListModal */}
                <AddToListModal
                    isVisible={isModalVisible}
                    onCancel={handleCancel}
                    onOk={handleOk}
                    mediaTitle={title}
                    onAddOrRemoveMedia={onAddOrRemoveMedia}
                />
            </div>
        </LazyLoad>
    );
};

export default MovieCard;
