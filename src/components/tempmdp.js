import React, { useEffect, useState } from 'react';
import { FaStar } from "react-icons/fa";
import axios from 'axios';
import MovieSlider from './MovieSlider';
import { useParams } from 'react-router-dom';

const MovieDetailPage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=3db2c40e1c1f6fc13b4a0765b9d8bf58&language=en-US`);
                setMovie(response.data);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchMovieDetails();
    }, [movieId]);

    if (!movie) {
        return <div>Loading...</div>;
    }




    return (
        <div className="movie-details">
            <figure className="movie-detail--image">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            </figure>
            <div className='movie-details--main'>
                <div className="movie-info">
                    <h1 className='movie-info--title'>{movie.title}</h1>
                    <div className='movie-info--data'>
                        <section className='movie-info--rating'>
                            <FaStar style={{ color: "#FFD700" }} />
                            <p>{movie.vote_average}</p>
                        </section>
                        <p>{movie.runtime}m</p>
                        <p>{movie.release_date && new Date(movie.release_date).getFullYear()}</p>
                        {/* Add more details as needed */}
                    </div>

                    <p style={{ color: "#959499" }} >{movie.genres.map(genre => genre.name).join(', ')} </p>
                    <p>{movie.overview}</p>
                    {/* Additional information based on available data */}
                    {/* Example: Starring, Directed By, etc. */}
                </div>
                {/* Optional: Add trailers section if needed */}
                {/* Example: <div><h2>Trailers</h2><div className='movie-detail--trailerCard'></div></div> */}
                {/* Display related movies using MovieSlider */}
                <div>
                    <h2>You May Also Like</h2>
                    <MovieSlider movies={[]} /> {/* Pass related movies if needed */}
                </div>
            </div>
        </div>
    );
};

export default MovieDetailPage;
