import React from "react";
import './FutureMovies.css';
import { Link } from "react-router-dom";

const FutureMovies = (props) => {
    return (
        <div className="coming-soon-container">
            <h3 className="coming-soon-header">Coming Soon</h3>
            <div className="movie-list">
                {props.movies.map((movie, index) => (
                    <div className="coming-soon-movie-card" key={index}>
                        <div className="coming-soon-poster">
                            {/*<Link to={`/trailer/${movie.trailer.substring(movie.trailer.length - 11)}`}>*/}
                                <img
                                    src={movie.poster}
                                    style={{ width: "100%" }}
                                    alt={movie.title}
                                />
                            {/*</Link>*/}
                        </div>
                        <div className="coming-soon-movie-details">
                            <p>{movie.title}</p>
                            <p>Release Date: {movie.year}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FutureMovies