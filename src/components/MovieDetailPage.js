import React from 'react';
import { FaStar } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import MovieSlider from './MovieSlider';

const MovieDetailPage = ({ data }) => {
    const { movieId } = useParams();
    const movie = data[movieId];

    if (!movie) {
        return <div>Movie not found!</div>;
    }

    return (
        <div className="movie-details">
            <figure className="movie-detail--image">
                <img src={process.env.PUBLIC_URL + '/' + movie.isVertical} alt={movie.title} />
            </figure>
            <div className='movie-details--main'>
                <div className="movie-info">
                    <h1 className='movie-info--title'>{movie.title}</h1>
                    <div className='movie-info--data'>
                        <section className='movie-info--rating'>
                            <FaStar style={{ color: "#FFD700" }} />
                            <p>{movie.rating}</p>
                        </section>
                        <p>{movie.duration + "m"}</p>
                        <p>{movie.year}</p>
                        <p className='movie-info--pgrating'>{movie.pgRating}</p>
                    </div>

                    <p style={{ color: "#959499" }} >{movie.genre.join(', ')} </p>
                    <p>{movie.detailedDescription}</p>
                    {movie.starring && <p> <span style={{ color: '#959499', minWidth: "1120px" }}>Starring:
                    </span>  {movie.starring.join(', ')}</p>}
                    {movie.directedBy && <p> <span style={{ color: '#959499', minWidth: "112px" }}>Directed By: </span>  {movie.directedBy} </p>}
                </div>
                <div>
                    <h2>Trailers</h2>
                    <div className='movie-detail--trailerCard'></div>
                </div>
                <div>
                    <h2>You May Also Like</h2>
                    <MovieSlider movies={Object.values(data).filter(m => m.genre.includes(movie.genre[0]))} />
                </div>
            </div>
        </div>
    );
};

export default MovieDetailPage;
