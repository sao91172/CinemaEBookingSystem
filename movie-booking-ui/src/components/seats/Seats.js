import React, { useState, useEffect } from "react";
import "./Seats.css";
import {Link} from "react-router-dom";
import {request} from "../../api/axiosConfig";
import {useNavigate} from 'react-router-dom';

function Seats() {
  const [loading, setLoading] = useState(true); // Initial loading state
  const [rows, seatsPerRow] = [5, 8]; // number of rows and seats per row
  const [selectedSeats, setSelectedSeats] = useState(
      JSON.parse(localStorage.getItem("selectedSeats")) || []
  );
  const [occupiedSeats, setOccupiedSeats] = useState([]); //occupied seats

  const navigate = useNavigate();

  const getOccupiedSeats = async (movieId, showingDateTime) => {
    try {
      const payload = {
        movieId: movieId,
        dateTime: showingDateTime
      };
      const response = await request("POST", "/api/movies/showings/movie-date", payload);

      let seatsList = response.data.seatsList;
      seatsList = seatsList.split(',');

      let fullSeats = [];
      for (let i = 0; i < seatsList.length; i++) {
        if (seatsList[i].charAt(3) === "1") {
          fullSeats.push({ row: parseInt(convertValue(seatsList[i].charAt(0))), seat: parseInt(seatsList[i].charAt(1))})
        }
      }

      setOccupiedSeats(fullSeats);
      setLoading(false); // Set loading to false once the data is fetched
    } catch (err) {
      console.log(err);
      setLoading(false); // Set loading to false in case of an error
    }
  }

  function convertValue(input) {
    const numberToLetter = { 1: 'A', 2: 'B', 3: 'C', 4: 'D', 5: 'E' };
    const letterToNumber = { A: 1, B: 2, C: 3, D: 4, E: 5 };

    if (typeof input === 'number' && input >= 1 && input <= 5) {
      return numberToLetter[input];
    } else if (typeof input === 'string' && input.length === 1 && /[A-E]/.test(input)) {
      return letterToNumber[input];
    } else {
      return 'Invalid input. Please provide a number between 1 and 5 or a letter A-E.';
    }
  }

  useEffect(() => {
    const movieId = window.localStorage.getItem('selectedMovie');
    const dateTime = window.localStorage.getItem('selectedShowtime');
    getOccupiedSeats(movieId, dateTime);
  }, []);


  useEffect(() => {
    localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
  }, [selectedSeats]);

  const toggleSeat = (row, seat) => {
    const isOccupied = occupiedSeats.some(
        (s) => s.row === row && s.seat === seat
    );

    const underTicketLimit = () => {
      const totalTickets = localStorage.getItem('totalTickets');
      if (selectedSeats.length < totalTickets) {
        return true;
      }
      return false;
    }

    if (!isOccupied) {
      setSelectedSeats((prevSelectedSeats) => {
        const seatIndex = prevSelectedSeats.findIndex(
            (s) => s.row === row && s.seat === seat
        );
        if (seatIndex === -1 && underTicketLimit()) {
          return [...prevSelectedSeats, { row, seat }];
        } else {
          return prevSelectedSeats.filter(
              (s) => !(s.row === row && s.seat === seat)
          );
        }
      });
    }
  };

  const handleProceedClick = () => {
    const totalTickets = window.localStorage.getItem('totalTickets')
    if (selectedSeats.length.toString() !== totalTickets) {
      alert("Please select " + totalTickets + " tickets.");
    } else {
      navigate('/checkout')
    }
  };

  const seatLayout = [];

  for (let row = 1; row <= rows; row++) {
    const rowSeats = [];

    for (let seat = 1; seat <= seatsPerRow; seat++) {
      const isSelected = selectedSeats.some(
          (s) => s.row === row && s.seat === seat
      );
      const isOccupied = occupiedSeats.some(
          (s) => s.row === row && s.seat === seat
      );

      rowSeats.push(
          <div
              key={`seat-${row}-${seat}`}
              className={`seat ${isSelected ? "selected" : ""} ${
                  isOccupied ? "occupied" : ""
              }`}
              onClick={() => toggleSeat(row, seat)}
          >
            {seat}
          </div>
      );
    }

    seatLayout.push(
        <div key={`row-${row}`} className="seat-row">
          {rowSeats}
        </div>
    );
  }

  const pageBackgroundColor = "#000217";

  return (
      <div
          style={{
            backgroundColor: pageBackgroundColor,
            height: "100vh",
            width: "100%",
          }}
      >
        {loading ? (
            <p>Loading...</p>
        ) : (
            <div className="seats-container">
              <div className="legend">
                <div className="legend-item available">Available Seat</div>
                <div className="legend-item selected">Selected Seat</div>
                <div className="legend-item occupied">Occupied Seat</div>
              </div>
              <div className="screen">Screen</div>
              {seatLayout}
              <button className="proceed-button" onClick={handleProceedClick}>
                Proceed to Checkout
              </button>
            </div>
        )}
      </div>
  );
}

export default Seats;
