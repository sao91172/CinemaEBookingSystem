import React from "react";
import './CarouselElement.css'
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material'
import { Link } from "react-router-dom";

const CarouselElement = (props) => {

    function handleGetTicketsClick(movieId) {
        window.localStorage.setItem("selectedMovie", movieId);
    }

    return (
        <div className="carousel-container">
            <Carousel>
                {
                    props.movies.map((movie, index) => (
                        <Paper key={index}>
                            <div className="carousel-slide-container">
                                <div className="movie-carousel-poster">
                                    <img
                                        src={movie.poster}
                                        alt="movie carousel slide"
                                        style={{ height: "100%" }}
                                    />
                                </div>
                                <div className="movie-carousel-details">
                                    <p>{movie.title}</p>
                                    <Link to={`/showtimes`}>
                                        <button
                                            className="tickets-btn"
                                            onClick={() => handleGetTicketsClick(movie.movieId)}
                                        >
                                            Get Tickets
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </Paper>
                    ))
                }
            </Carousel>
        </div>
    )
}

export default CarouselElement