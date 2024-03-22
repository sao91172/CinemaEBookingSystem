import React from "react";
import './Admin.css';
import EditMovies from "./EditMovies";
import FutureMovies from '../home/FutureMovies';

const Admin = (props) => {

    return (
        <div className="home-container">
            <div className="movies-container">
                <div className="current-movies-container">
                    <EditMovies movies={props.movies} />
                </div>
                <div className="future-movies-container">
                    <FutureMovies movies={props.movies}/>
                    <div className="add-remove-buttons">
                            <button className="add-btn">Add</button>
                            <button className="remove-btn">Remove</button>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Admin;