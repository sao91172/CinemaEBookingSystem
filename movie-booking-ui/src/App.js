import './App.css';
import Home from './components/home/Home';
import {request} from './api/axiosConfig.js';
import {useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import Header from './components/header/Header';
import Login from './components/login/Login';
import Register from './components/register/Register';
import OrderHistory from './components/orderhistory/OrderHistory';
import Verification from './components/verification/verification';
import Seats from './components/seats/Seats';
import Checkout from './components/checkout/Checkout';
import EditProfile from "./components/editProfile/EditProfile";


import TrailerElement from './components/trailer/TrailerElement';
import Ticket from './components/tickets/Ticket';
import Confirmation from './components/confirmation/Confirmation';
import Admin from './components/admin/Admin';
import Users from './components/admin/users/Users';
import Promotions from './components/admin/promo/Promotions';
import Showtimes from './components/showtimes/Showtimes';
import ForgotPassword from "./components/login/ForgotPassword";



function App() {

    const testMovies = [
        {
            title: "Black Panther",
            year: "1999",
            imdbId: "aaaaaaa",
            poster: "./testResources/bp.jpg",
            rating: "5",
            trailer: "https://www.youtube.com/watch?v=pBk4NYhWNMM"
        },
        {
            title: "Harry Potter",
            year: "2000",
            imdbId: "bbbbbb",
            poster: "./testResources/harry-potter.jpg",
            rating: "6",
            trailer: "https://www.youtube.com/watch?v=pBk4NYhWNMM"
        }
    ];

    const promotions = [
        { title: '20% Off "Horror Movies (Expires Nov 1st)' },
        { title: 'Buy One Get One Free on Child Tickets' },
        { title: 'Summer Sale' },
    ];
    const [movies, setMovies] = useState(testMovies);
    const [comingSoon, setComingSoon]= useState(testMovies);

    const getMovies = async () => {
        try {
            const movieList = await request("GET", "/api/movies", );
            // const movieList = await api.get("/api/movies");
            console.log(movieList.data);
            setMovies(movieList.data);

        } catch (err) {
            console.log(err);
        }
    }

    const getComingSoon = async () => {
        try {
            const comingSoonList = await request("GET", "/api/movies/coming-soon",);
            setComingSoon(comingSoonList.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getMovies();
        getComingSoon();
    }, []);

    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path='/' element={<Home movies={movies} comingSoon={comingSoon}/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/verification' element={<Verification/>}/>
                <Route path='/seats' element={<Seats/>}/>
                <Route path='/trailer/:youtubeId' element={<TrailerElement/>}/>
                <Route path='/checkout' element={<Checkout/>}/>
                <Route path='/ticket' element={<Ticket movies = {movies} />}/>
                <Route path='/confirmation' element={<Confirmation />}/>
                <Route path = '/admin' element = {<Admin movies={movies}/>}/>
                <Route path="/admin/users" element = {<Users/>}/>
                <Route path = '/admin/promo' element = {<Promotions promotions={promotions}/>}/>
                <Route path='/edit-profile' element={<EditProfile />}/>
                <Route path= '/orderhistory' element={<OrderHistory/>}/>
                <Route path='/showtimes' element={<Showtimes />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
            </Routes>
        </div>
    )

}

export default App;
