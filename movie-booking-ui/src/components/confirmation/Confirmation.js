import React, {useState} from "react";
import { Button } from "react-bootstrap";
import {useParams} from 'react-router-dom';
import { useEffect } from "react";
import './Confirmation.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Confirmation = () => {

    return (
        <div className="CONFIRMATION">
          
          
            <div className="text-wrapper">ORDER CONFIRMED!</div>
            <br></br>
                <CheckCircleIcon class="group-wrapper" style={{color: 'white'}}/>
           


            <p class="p">Your order number is :</p>
            <p className="ordernumber">{window.localStorage.getItem('order_number')}</p>
            
            <Button href="/orderhistory" className="btn">Order History</Button>

            <Button  href="/" className="btn-2">Return Home</Button>
          
        </div>
    )//return 
}//Confirmation
export default Confirmation;