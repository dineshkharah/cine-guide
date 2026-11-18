import React from 'react';
import { useParams } from 'react-router-dom';
import MovieCard from './MovieCard';
import SeriesCard from './SeriesCard';
import LazyLoad from './LazyLoad';
import { Skeleton } from 'antd';
import useFetch from '../hooks/useFetch';

const PersonDetailPage = () => {
    const { personId } = useParams();
    const apiKey = process.env.REACT_APP_API_KEY;

    const { data: person, loading, error } = useFetch(
        `https://api.themoviedb.org/3/person/${personId}?api_key=${apiKey}&language=en-US`
    );
    const { data: creditsData } = useFetch(
        `https://api.themoviedb.org/3/person/${personId}/combined_credits?api_key=${apiKey}&language=en-US`
    );

    if (error) {
        return <p className="load-error">Could not load this person. Check your connection and try again.</p>;
    }

    if (loading || !person) {
        return <Skeleton active paragraph={{ rows: 10 }} />;
    }

    const limitedCredits = (creditsData?.cast || []).slice(0, 20);

    return (
        <div className="person-details">
            <figure className="person-detail--image">
                <LazyLoad skeletonType="image">
                    <img src={`https://image.tmdb.org/t/p/w500${person.profile_path}`} alt={person.name} className="person-detail--image" />
                </LazyLoad>
            </figure>
            <div className="person-details--main">
                <div className="person-info">
                    <LazyLoad skeletonType="title">
                        <h1 className="person-info--name">{person.name}</h1>
                    </LazyLoad>
                    <LazyLoad skeletonType="contentdesc">
                        <p className="person-info--biography">{person.biography}</p>
                    </LazyLoad>
                </div>
                <div>
                    <h2 style={{ fontSize: "1.8rem" }}>Known For</h2>
                    <div className="person-credits">
                        {limitedCredits.length > 0 ? (
                            limitedCredits.map(credit => {
                                // combined_credits has both movies and TV shows, so
                                // each one needs the card that links to the right page.
                                // credit_id is different for every credit, so keys stay
                                // unique even if someone is credited twice in one title.
                                const cardKey = credit.credit_id || `${credit.media_type}-${credit.id}`;
                                return credit.media_type === 'tv'
                                    ? <SeriesCard key={cardKey} series={credit} />
                                    : <MovieCard key={cardKey} movie={credit} />;
                            })
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
