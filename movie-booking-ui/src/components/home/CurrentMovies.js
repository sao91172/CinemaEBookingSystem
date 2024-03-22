import {useEffect, useState} from "react";
import "./CurrentMovies.css"
import {Link} from "react-router-dom";


const CurrentMovies = (props) => {

    const [searchQuery, setSearchQuery] = useState('');

    const filteredMovies = props.movies.filter((movie) => {
        return movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const rows = [];
    for (let i = 0; i < filteredMovies.length; i += 4) {
        rows.push(filteredMovies.slice(i, i + 4));
    }


    function handleGetTicketsClick(movieId) {
        window.localStorage.setItem("selectedMovie", movieId);
    }


    return (
        <div className="now-playing-container">
            <div className={"now-playing-header-container"}>
                <h3 className="now-playing-header-text">Now Playing</h3>
                <div className={"now-playing-search-container"}>
                    <input
                        type={"text"}
                        placeholder={"Search"}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>
            {rows.map((row, rowIndex) => (
                <div className="movie-row" key={rowIndex}>
                    {row.map((movie, index) => (
                        <div className="movie-card" key={index}>
                            <div className="current-movie-poster-container">
                                <Link to={`/trailer/${movie.trailer.substring(movie.trailer.length - 11)}`}>
                                    <img
                                        src={movie.poster}
                                        style={{width: "100%"}}
                                        alt={movie.title}
                                    />
                                </Link>
                            </div>
                            <div className="text-left current-movie-details">
                                <p>{movie.title}</p>
                                <p>
                                    Genre: {movie.category} | Rating: {movie.rating}
                                </p>
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
                    ))}
                </div>
            ))}
        </div>
    )

}

export default CurrentMovies