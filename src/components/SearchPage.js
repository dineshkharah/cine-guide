import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import MovieCard from './MovieCard';
import SeriesCard from './SeriesCard';
import { FaSearch } from "react-icons/fa";

const SearchPage = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const urlQuery = new URLSearchParams(location.search).get('query');

    useEffect(() => {
        if (urlQuery) {
            setQuery(urlQuery);
            fetchSearchResults(urlQuery);
        }
    }, [urlQuery]);

    useEffect(() => {
        if (query) {
            const timer = setTimeout(() => {
                navigate(`/search?query=${query}`);
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [query, navigate]);

    const fetchSearchResults = async (searchQuery) => {
        let url = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_API_KEY}&query=${searchQuery}&language=en-US`;

        try {
            const response = await axios.get(url);
            setResults(response.data.results || []);
        } catch (error) {
            console.error('Error fetching search results:', error);
            setResults([]);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (query) {
            navigate(`/search?query=${query}`);
        }
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
                <button type="submit" className="search-submit-button">
                    <FaSearch />
                </button>
            </form>
            <div className="search-results">
                {results.length > 0 ? (
                    results.map(result => {
                        if (result.media_type === 'movie') {
                            return <MovieCard key={result.id} movie={result} />;
                        } else if (result.media_type === 'tv') {
                            return <SeriesCard key={result.id} series={result} />;
                        }
                        return null;
                    })
                ) : (
                    <p>No results found</p>
                )}
            </div>
        </div>
    );
};

export default SearchPage;
