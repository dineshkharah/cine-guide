import React from 'react';
import { Link } from 'react-router-dom';
import { CiCircleMore } from "react-icons/ci";

const Carousel = ({ data }) => {
    return (
        <div className="container">
            <div id="carousel" className="carousel slide carousel-dark arrows-outside" data-bs-ride="carousel" data-bs-interval="10000">
                <div className="carousel-inner">
                    {Object.keys(data).map((key, index) => (
                        <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={key}>
                            <img src={process.env.PUBLIC_URL + '/' + data[key].image} className="carousel-image" alt={data[key].title} />
                            <div className="carousel-caption d-block position-absolute top-0 start-0 w-100 h-100">
                                <div className="overlay-text p-3">
                                    <h3 className='carousel-title'>{data[key].title}</h3>
                                    <div className="d-flex carousel-text">
                                        <p className='carousel-year'>{data[key].year}</p>
                                        <p className='carousel-rating'>{data[key].rating}</p>
                                    </div>
                                    <p className='carousel-text'>{data[key].genre.join(', ')}</p>
                                    <p className='carousel-description carousel-text'>{data[key].description}</p>
                                    <Link to={`/${key}`} className='carousel-btn'>
                                        <CiCircleMore className='carousel-icon' />
                                        <span>More Info</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="carousel-indicators">
                    {Object.keys(data).map((key, index) => (
                        <button
                            type="button"
                            data-bs-target="#carousel"
                            data-bs-slide-to={index}
                            className={index === 0 ? 'active' : ''}
                            aria-current={index === 0 ? 'true' : 'false'}
                            aria-label={`Slide ${index + 1}`}
                            key={key}
                        ></button>
                    ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
                    <svg width="15" height="23" viewBox="0 0 15 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m14.8 2.675-9.148 8.71 9.148 8.708-2.816 2.676L0 11.384 11.984 0 14.8 2.675Z" fill="currentColor"></path></svg>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
                    <svg width="16" height="23" viewBox="0 0 16 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m.5 20.094 9.147-8.71L.5 2.677 3.316 0 15.3 11.385 3.316 22.769.5 20.094Z" fill="currentColor"></path></svg>
                </button>
            </div>
        </div>
    );
};

export default Carousel;
