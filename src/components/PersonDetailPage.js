import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MovieCard from './MovieCard';
import LazyLoad from './LazyLoad';
import { Skeleton } from 'antd';

const PersonDetailPage = () => {
    const { personId } = useParams();
    const [person, setPerson] = useState(null);
    const [credits, setCredits] = useState([]);

    const fetchPersonDetails = useCallback(async () => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/person/${personId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
            setPerson(response.data);
        } catch (error) {
            console.error('Error fetching person details:', error);
        }
    }, [personId]);

    const fetchPersonCredits = useCallback(async () => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/person/${personId}/combined_credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
            setCredits(response.data.cast);
        } catch (error) {
            console.error('Error fetching person credits:', error);
        }
    }, [personId]);

    useEffect(() => {
        fetchPersonDetails();
        fetchPersonCredits();
    }, [fetchPersonDetails, fetchPersonCredits]);

    if (!person) {
        return <Skeleton active paragraph={{ rows: 10 }} />;
    }

    const limitedCredits = credits.slice(0, 20);

    return (
        <div className="person-details">
            <figure className="person-detail--image">
                <LazyLoad skeletonType="image">
                    <img src={`https://image.tmdb.org/t/p/w500${person.profile_path}`} alt={person.name} className='person-detail--image' />
                </LazyLoad>
            </figure>
            <div className="person-details--main">
                <div className="person-info">
                    <LazyLoad skeletonType="title">
                        <h1 className="person-info--name">{person.name}</h1>
                    </LazyLoad>
                    <LazyLoad skeletonType="contentdesc">
                        <p className='person-info--biography'>{person.biography}</p>
                    </LazyLoad>
                </div>
                <div>
                    <h2 style={{ fontSize: "1.8rem" }}>Known For</h2>
                    <div className="person-credits">
                        {limitedCredits.length > 0 ? (
                            limitedCredits.map(credit => (
                                <LazyLoad key={credit.id} skeletonType="card">
                                    <MovieCard key={credit.id} movie={credit} />
                                </LazyLoad>
                            ))
                        ) : (
                            <p>No credits available</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonDetailPage;
