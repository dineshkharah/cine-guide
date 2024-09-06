import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import LazyLoad from './LazyLoad';
import { Button, Modal } from 'antd';

const SeriesCard = ({ series }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    }

    const handleOk = () => {
        setIsModalVisible(false);
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    }

    return (
        <LazyLoad skeletonType="card">
            <div className="series-card">
                <Link to={`/series/${series.id}`}>
                    <img src={`https://image.tmdb.org/t/p/w500${series.poster_path}`} alt={`Poster of ${series.name}`} className="series-card--image" />
                    <div className="series-card--info">
                        <h5 className="series-card--title">(S) {series.name}</h5>
                        <div className="series-card--detail">
                            <span style={{ display: "flex", justifyContent: "center" }}>
                                <FaStar style={{ color: "#FFD700", marginRight: "5px" }} />
                                {series.vote_average.toFixed(1)}
                            </span>
                            <span className="series-card--year">{new Date(series.first_air_date).getFullYear()}</span>
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

export default SeriesCard;
