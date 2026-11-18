import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MovieCard from './MovieCard';
import SeriesCard from './SeriesCard';
import { FaSearch } from "react-icons/fa";
import useFetch from '../hooks/useFetch';

const SearchPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const urlQuery = new URLSearchParams(location.search).get('query');
    const [query, setQuery] = useState(urlQuery || '');

    // Only ask the api for something once there is a query in the address bar.
    // encodeURIComponent keeps characters like & and # inside the query instead
    // of letting them break the url apart.
    const searchUrl = urlQuery
        ? `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_API_KEY}&query=${encodeURIComponent(urlQuery)}&language=en-US`
        : null;

    const { data, error } = useFetch(searchUrl);
    const results = data?.results || [];

    // Keep the box in step with the address bar, so back and forward work.
    useEffect(() => {
        setQuery(urlQuery || '');
    }, [urlQuery]);

    useEffect(() => {
        if (query) {
            const timer = setTimeout(() => {
                navigate(`/search?query=${encodeURIComponent(query)}`);
            }, 500);

            return () => clearTimeout(timer);
        }

        navigate('/search');
        return undefined;
    }, [query, navigate]);

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(query ? `/search?query=${encodeURIComponent(query)}` : '/search');
    };

    const renderResults = () => {
        if (error) {
            return <p className="search-message">Could not run that search. Check your connection and try again.</p>;
        }

        if (results.length > 0) {
            return results.map(result => {
                if (result.media_type === 'movie') {
                    return <MovieCard key={result.id} movie={result} />;
                }
                if (result.media_type === 'tv') {
                    return <SeriesCard key={result.id} series={result} />;
                }
                return null;
            });
        }

        if (urlQuery) {
            return <p className="search-message">No results found</p>;
        }

        return <p className="search-message">Search for a movie or TV series to get started.</p>;
    };

    return (
        <div className="search-page">
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search for movies or TV series..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="search-input"
                />
                <button type="submit" className="search-submit-button" aria-label="Search">
                    <FaSearch />
                </button>
            </form>
            <div className="search-results">
                {renderResults()}
            </div>
        </div>
    );
};

export default SearchPage;
