import React, {useEffect} from "react";
import './Home.css';
import CarouselElement from "./CarouselElement";
import CurrentMovies from "./CurrentMovies";
import FutureMovies from './FutureMovies';

const Home = (props) => {

    useEffect(() => {
        window.localStorage.removeItem('selectedMovie');
        window.localStorage.removeItem('selectedShowtime');
        window.localStorage.removeItem('ticketCounts');
        window.localStorage.removeItem('totalTickets');
        window.localStorage.removeItem('selectedSeats');
    }, []);

    return (
        <div className="home-container">
            <CarouselElement movies={props.movies}/>
            <div className="movies-container">
                <div className="current-movies-container">
                    <CurrentMovies movies={props.movies} />
                </div>
                <div className="future-movies-container">
                    <FutureMovies movies={props.comingSoon}/>
                </div>
            </div>
        </div>
    )
}

export default Home