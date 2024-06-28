// src/api.js
import axios from 'axios';

const apiKey = process.env.REACT_APP_TMDB_API_KEY;
const apiUrl = 'https://api.themoviedb.org/3';

export const fetchMovies = async (endpoint) => {
    try {
        const response = await axios.get(`${apiUrl}/${endpoint}`, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json;charset=utf-8',
            },
        });
        return response.data.results;
    } catch (error) {
        console.error("Error fetching data: ", error);
        return [];
    }
};
