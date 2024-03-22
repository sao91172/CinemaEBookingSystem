import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import {Button} from "react-bootstrap";
import './Ticket.css';


import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CloseIcon from '@mui/icons-material/Close';
import {request} from "../../api/axiosConfig";

const Ticket = ({movies}) => {

    const [moviePoster, setMoviePoster] = useState();
    const [movieTitle, setMovieTitle] = useState();
    const [movieRating, setMovieRating] = useState();
    const [movieYear, setMovieYear] = useState();

    const [loading, setLoading] = useState(true); // Initial loading state
    const [prices, setPrices] = useState();

    function getMovieDetails() {
        let selectedMovie = window.localStorage.getItem("selectedMovie");

        for (let i = 0; i < movies.length; i++) {
            if (movies[i].movieId.toString() === selectedMovie) {
                setMovieTitle(movies[i].title);
                setMoviePoster(movies[i].poster);
            }
        }
    }

    const getPrices = async () => {
        try {
            const response = await request("GET", "/api/payment/prices", );
            setPrices(response.data);
            setLoading(false); // Set loading to false once the data is fetched
        } catch (err) {
            console.log(err);
            setLoading(false); // Set loading to false in case of an error
        }
    }


    const [ticketCounts, setTicketCounts] = useState({
        adult: 0,
        child: 0,
        senior: 0,
    });

    const [totalTickets, setTotalTickets] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        getMovieDetails();
        getPrices();
    }, [])

    useEffect(() => {
        // Load ticket counts from localStorage on component mount
        const storedCounts = JSON.parse(localStorage.getItem('ticketCounts')) || {};
        setTicketCounts(storedCounts);
    }, []);

    useEffect(() => {
        // Update localStorage when ticketCounts change
        localStorage.setItem('ticketCounts', JSON.stringify(ticketCounts));
        const total = Object.values(ticketCounts).reduce((acc, count) => acc + count, 0);
        setTotalTickets(total);
    }, [ticketCounts]);

    const increment = (type) => {
        setTicketCounts((prevCounts) => ({
            ...prevCounts,
            [type]: prevCounts[type] + 1,
        }));
    };

    const decrement = (type) => {
        if (ticketCounts[type] > 0) {
            setTicketCounts((prevCounts) => ({
                ...prevCounts,
                [type]: prevCounts[type] - 1,
            }));
        }
    };

    const handleNextPage = () => {
        // Save data before navigating to the next page
        localStorage.setItem('ticketCounts', JSON.stringify(ticketCounts));
        localStorage.setItem('totalTickets', totalTickets.toString());
        navigate('/seats'); // Navigate to the next page
    };


    return(
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="TICKETS">
                    <Button  href = "/showtimes" className = "back-arrow" style = {{border: 'none', backgroundColor: 'transparent'}}><ArrowBackIosNewIcon  style = {{color: 'white', width:'70px', height: 'auto' }}/></Button>
                    <p className ="p">Select Ticket Type</p>
                    <Button href = "/" className = "x-icon" style = {{border: 'none', backgroundColor: 'transparent',}}><CloseIcon style = {{color: 'white', width:'70px', height: '80.38px'}}/></Button>

                    <div className = "img-wrapper">
                        <img className="poster-img" src={moviePoster} alt={"movie poster"}/> {/* movie poster goes here */}
                    </div>

                    <p className="title-year-rating">
                        <span className="span"> {movieTitle}<br/></span>
                        <span>{movieYear} | {movieRating}<br /></span>
                    </p>
                    <div className="minus-sign-div" style = {{marginRight: '290px'}}>
                        <button className= "minus-sign1" style = {{border: 'none', backgroundColor: 'transparent'}} onClick={() => decrement('adult')} ><RemoveCircleOutlineIcon style = {{color: 'white', width:'68px', height:'67px',}}/></button>
                        <button className= "minus-sign2" style = {{border: 'none', backgroundColor: 'transparent'}} onClick={() => decrement('child')} ><RemoveCircleOutlineIcon style = {{color: 'white', width:'68px', height:'67px',}}/></button>
                        <button className= "minus-sign3" style = {{border: 'none', backgroundColor: 'transparent'}} onClick={() => decrement('senior')} ><RemoveCircleOutlineIcon style = {{color: 'white', width:'68px', height:'67px',}}/></button>
                    </div>

                    <div className="overlap-group">
                        <p className="ticket-types-adult">
                            <span className="ticket-type-header"><span>{ticketCounts.adult}</span> Adult</span>
                            <span className="ticket-type-price-adult"> <br/> ${prices[0].price}<br /></span>
                        </p>

                        <p className="ticket-types-child">
                            <span className="ticket-type-header"><span>{ticketCounts.child}</span>  Child<br/></span>
                            <span className="ticket-type-subheader">Age 2-12</span>
                            <span className="ticket-type-price"> ${prices[1].price}<br /></span>
                        </p>

                        <p className="ticket-types-senior">
                            <span className="ticket-type-header"><span>{ticketCounts.senior}</span>  Senior<br/></span>
                            <span className="ticket-type-subheader">Age 65+</span>
                            <span className="ticket-type-price"> ${prices[2].price}<br /></span>
                        </p>
                    </div>

                    <div className="plus-sign-div">
                        <button className = "minus-sign1" style = {{border: 'none', backgroundColor: 'transparent'}} onClick={() => increment('adult')} ><AddCircleOutlineIcon style = {{color: 'white', width:'68px', height:'67px',}}/></button>
                        <button className= "minus-sign2" style = {{border: 'none', backgroundColor: 'transparent'}} onClick={() => increment('child')} ><AddCircleOutlineIcon style = {{color: 'white', width:'68px', height:'67px',}}/></button>
                        <button className= "minus-sign3" style = {{border: 'none', backgroundColor: 'transparent'}} onClick={() => increment('senior')} ><AddCircleOutlineIcon style = {{color: 'white', width:'68px', height:'67px',}}/></button>
                    </div>

                    <div className="text-wrapper-14" id = 'totalTickets'> {totalTickets} TICKETS SELECTED</div>
                    <button className= "input" onClick={handleNextPage}> CONTINUE</button>
                </div>
            )}
        </div>
    )//return
}//Ticket
export default Ticket;