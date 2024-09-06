import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import LazyLoad from './LazyLoad';
import { Button, Modal } from 'antd';

const MovieCard = ({ movie }) => {
    const title = movie.title || movie.name; // Use title for movies and name for TV series
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        // Add movie to selected list
    };

    const handleCancel = () => {
        setIsModalVisible(false);
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
                <Modal title="Add to List" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    {/* List selection or creation UI goes here */}
                    <p>Select a list or create a new one.</p>
                </Modal>
            </div>
        </LazyLoad>
    );
};

export default MovieCard;
