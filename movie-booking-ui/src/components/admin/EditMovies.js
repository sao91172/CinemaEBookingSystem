import React, { useState } from "react";
import "./EditMovies.css";
import {Link } from "react-router-dom";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {request} from "../../api/axiosConfig";


const EditMovies = (props) => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [cast, setCast] = useState("");
    const [director, setDirector] = useState("");
    const [producer, setProducer] = useState("");
    const [synopsis, setSynopsis] = useState("");
    const [rating, setRating] = useState("");
    const [review, setReview] = useState("");
    const [youTubeLink, setYouTubeLink] = useState("");
    const [imageLink, setImageLink] = useState("");




    const [isPopupActive, setPopupActive] = useState(false);

    const handleAddMovie = () => {
        setPopupActive(true);
      };
      const handleCloseOut = () => {
        setPopupActive(false);
      };


    function isValidForm () {
        if (title === "") {
            alert("Movie Title cannot be empty.");
            return false;
        }

        if (category === "") {
            alert("The 'Category' field cannot be empty.");
            return false;
        }
        // if (cast === "") {
        //     alert("The Casting field cannot be empty.");
        //     return false;
        // }
        //
        // if (director === "") {
        //     alert("The 'Director' cannot be empty.");
        //     return false;
        // }
        //
        // if (producer === "") {
        //     alert("The 'Producer' field cannot be empty.");
        //     return false;
        // }
        //
        // if (synopsis === "") {
        //     alert("The 'Synopisi' field cannot be empty.");
        //     return false;
        // }

        if (rating === "") {
            alert("The 'Rating' field cannot be empty.");
            return false;
        }


        if (review === "") {
            alert("The 'Review' field cannot be empty.");
            return false;
        }


        if (youTubeLink === "") {
            alert("The 'YouTube Link' field cannot be empty.");
            return false;
        }

        if (imageLink === "") {
            alert("Please link an Image to the movie.");
            return false;
        }
        return true;
    }

    function handleDone (event) {
        if(isValidForm()) {
            submit();
            setPopupActive(false);
        }
    }

    async function submit () {
        try {
            const payload = {
                title: title,
                category: category,
                cast: cast,
                director: director,
                producer: producer,
                synopsis: synopsis,
                review: review,
                poster: imageLink,
                trailer: youTubeLink,
                rating: rating
            }

            const response = await request("POST", "/api/movies/add", payload);

            // const response = await api.post("/api/movies/add", payload, {
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            // });
            console.log("Response: " + response.data.toString());

        } catch (err) {
            console.log(err)
        }
    }


    const rows = [];
    for (let i = 0; i < props.movies.length; i += 4) {
        rows.push(props.movies.slice(i, i + 4));
    }


    return (
        <div className="now-playing-container">
            <h3 className="now-playing-header">Now Playing</h3>
            <button className="add-movie-btn" type="button" id = "add-movie" onClick={handleAddMovie}> Add Movie</button>
            <Link to="/admin/users"><button className="see-users-btn"> See Users</button></Link>
            <Link to = "/admin/promo"><button className = "see-promo-btn"> See Promotions</button></Link>
            {isPopupActive && (
            <div className = "popup">
                <div className = "close-btn" onClick={handleCloseOut}>&times;</div>
                <div className = "center">

                <div className = "form">
                    <h2> Add Movie</h2>
                    <div className = "form-element">
                        <label htmlFor="Title"></label>
                        <input type="text"  id = 'movie-title' className="rectangle" placeholder="Enter Title" 
                         value={title} onChange={ (event) => {setTitle(event.target.value);
                            }} />
                    </div>

                    <div className = "form-element">
                        <label htmlFor="Category"></label>
                        <input type="text"  id = 'movie-category' className="rectangle" placeholder="Enter Genre"
                         value={category} onChange={ (event) => {setCategory(event.target.value);
                         }}/>
                    </div>

                    <div className = "form-element">
                        <label htmlFor="Cast"></label>
                        <textarea type="text" id = 'movie-cast' className="rectangle" placeholder="Enter Cast"
                         value={cast} onChange={ (event) => {setCast(event.target.value);
                         }}/>
                    </div>

                    <div className = "form-element">
                        <label htmlFor="Director"></label>
                        <input type="text" id = 'movie-director' className="rectangle" placeholder="Enter Director" 
                         value={director} onChange={ (event) => {setDirector(event.target.value);
                         }}/>
                    </div>

                    <div className = "form-element">
                        <label htmlFor="Producer"></label>
                        <input type="text" id = 'movie-producer' className="rectangle" placeholder="Enter Producer"
                        value={producer} onChange={ (event) => {setProducer(event.target.value);
                        }}/>
                    </div>

                    <div className = "form-element">
                        <label htmlFor="Synopsis"></label>
                        <textarea type="text" id = 'movie-synopsis' className="rectangle" placeholder="Enter Synopsis"
                        value={synopsis} onChange={ (event) => {setSynopsis(event.target.value);
                        }}/>
                    </div>

                    <div className = "form-element">
                        <label htmlFor="Rating"></label>
                        <input type="number" id = 'movie-rating' className="rectangle" placeholder="Enter Rating"
                         value={rating} onChange={ (event) => {setRating(event.target.value);
                         }}/>
                    </div>

                    <div className = "form-element">
                        <label htmlFor="Review"></label>
                        <input type="text" id = 'movie-review' className="rectangle" placeholder="Enter Review"
                         value={review} onChange={ (event) => {setReview(event.target.value);
                         }}/>
                    </div>

                    <div className = "form-element">
                        <label htmlFor="YouTube Link"></label>
                        <input type="url" id = 'movie-youTube Link' className="rectangle" placeholder="Enter YouTube Link"
                        value={youTubeLink} onChange={ (event) => {setYouTubeLink(event.target.value);
                        }}/>
                    </div>

                    <div className = "form-element">
                        <label htmlFor="Image Link"></label>
                        <input type="url" id = 'movie-youTube Link' className="rectangle" placeholder="Enter Image Link"
                         value={imageLink} onChange={ (event) => {setImageLink(event.target.value);
                         }}/>
                    </div>


                    <div className = "form-element">
                        <button onClick={handleDone}>Done</button>
                    </div>
                    

                </div>
                </div>
            </div>
            )}
            {rows.map((rows, rowIndex) => (
                <div className="movie-row" key={rowIndex}>
                    {rows.map((movie, index) => (
                        <div className="movie-card" key={index}>
                            <div>
                                <img
                                    src={movie.poster}
                                    style={{width: "100%"}}
                                    alt={movie.title}
                                />
                            </div>
                            <div className="text-left">
                                <p>{movie.title}</p>
                                <p>
                                    Year: {movie.year} | Rating: {movie.rating}
                                </p>
                                <button className="edit-btn">Delete</button>
                                <DeleteOutlineOutlinedIcon style={{color:'white', width:'28px',height:'28px', gap:'500px'}}/>
                            </div>
                        </div>
                    ))}
                </div>
            
            ))}
      

        </div>
    )
}

export default EditMovies;