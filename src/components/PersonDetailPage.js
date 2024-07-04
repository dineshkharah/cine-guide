// src/components/PersonDetailPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MovieCard from './MovieCard';

const PersonDetailPage = () => {
    const { personId } = useParams();
    const [person, setPerson] = useState(null);
    const [credits, setCredits] = useState([]);

    useEffect(() => {
        const fetchPersonDetails = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/person/${personId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
                setPerson(response.data);
            } catch (error) {
                console.error('Error fetching person details:', error);
            }
        };

        const fetchPersonCredits = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/person/${personId}/combined_credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
                setCredits(response.data.cast);
            } catch (error) {
                console.error('Error fetching person credits:', error);
            }
        };

        fetchPersonDetails();
        fetchPersonCredits();
    }, [personId]);

    if (!person) {
        return <div>Loading...</div>;
    }

    return (
        <div className="person-details">
            <figure className="person-detail--image">
                <img src={`https://image.tmdb.org/t/p/w500${person.profile_path}`} alt={person.name} />
            </figure>
            <div className="person-details--main">
                <div className="person-info">
                    <h1 className="person-info--name">{person.name}</h1>
                    <p>{person.biography}</p>
                </div>
                <div>
                    <h2>Known For</h2>
                    <div className="person-credits">
                        {credits.length > 0 ? (
                            credits.map(credit => (
                                <MovieCard key={credit.id} movie={credit} />
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
