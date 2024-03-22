import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Showtimes.css';
import { request } from '../../api/axiosConfig.js';

function Showtimes() {
    const [movie, setMovie] = useState(null); // Initialize as null to represent loading state
    const [showTimes, setShowTimes] = useState([]);
    const [loading, setLoading] = useState(true); // Initial loading state

    const getSelectedMovie = async (movieId) => {
        try {
            const payload = {
                movieId: movieId,
            };
            const response = await request("POST", "/api/movies/movie", payload);
            setMovie(response.data);
            setShowTimes(response.data.showings)
            setLoading(false); // Set loading to false once the data is fetched
        } catch (err) {
            console.log(err);
            setLoading(false); // Set loading to false in case of an error
        }
    }

    useEffect(() => {
        const selectedMovieId = window.localStorage.getItem('selectedMovie');
        getSelectedMovie(selectedMovieId);
    }, []);


    const handleSelectShowtime = (showTime) => {
        window.localStorage.setItem('selectedShowtime', showTime)
    };

    function convertDateTime(dateTime) {
        let readbleDate = "";

        let splitDate = dateTime.split("-");
        readbleDate += splitDate[1] + "-" + splitDate[2] + "-" + splitDate[0] + " " + splitDate[3] + ":" + splitDate[4];

        return readbleDate;

    }

    return (
        <div className="showtimes-container">
            <h1>Showtimes</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="centered-content">
                    <div className="movie-container">
                        <img className="movie-poster" src={movie.poster} alt={`${movie.title} Poster`} />
                        <div className="movie-info">
                            <h2>{movie.title} {movie.year}</h2>
                            <p>Rating: {movie.rating}</p>
                            <h3>Showtimes</h3>
                            <ul>
                                {showTimes.map((showing, index) => (
                                    <li key={index}>
                                        <Link to={"/ticket"}>
                                            <button
                                                className="showtime-button"
                                                onClick={() => handleSelectShowtime(showing.dateTime)}
                                            >
                                                {convertDateTime(showing.dateTime)} {/* Convert dateTime to a readable format */}
                                            </button>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Showtimes;