import React from "react"
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import './OrderHistory.css';
import {request} from "../../api/axiosConfig";

const OrderHistory = () => {

    const [orders, setOrders] = useState([]);

    // Assume you have an API endpoint to fetch order history for a user
    const fetchOrderHistory = async () => {
        try {
            const payload = {
                email: getUserEmail()
            }
            // Make an API call to fetch order history data
            const response = await request("POST", "/api/users/orders", payload);

            // Update the orders state with the fetched data
            setOrders(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching order history:', error);
        }
    };

    useEffect(() => {
        // Fetch order history when the component mounts
        fetchOrderHistory();
    }, []);

    const getUserEmail = () => {
        return window.localStorage.getItem ('user_email');
    }

    function convertDateTime(dateTime) {
        let readbleDate = "";

        let splitDate = dateTime.split("-");
        readbleDate += splitDate[1] + "-" + splitDate[2] + "-" + splitDate[0] + " " + splitDate[3] + ":" + splitDate[4];

        return readbleDate;

    }


    return (
        <div className = "ORDER-HISTORY">
            <h1>Order History</h1>
            <table className = "order-table">
                <thead>
                <tr>
                    <th>Order</th>
                    <th>Date</th>
                    <th> Movie</th>
                    <th>Number of Tickets</th>
                    <th>Amount Paid</th></tr>
                </thead>
                <tbody>
                {orders.map((order) => (
                    <tr key={order.orderId}>
                        <td>{order.orderId}</td>
                        <td>{order.movie.title}</td>
                        <td>{convertDateTime(order.dateTime)}</td>
                        <td>{order.adultQuantity} + {order.childQuantity} + {order.seniorQuantity}</td>
                        <td>${order.orderTotal}</td>

                    </tr>
                ))}
                </tbody>
            </table>
            <Button href = "/" > Return Home</Button>
        </div>

    )
}

export default OrderHistory
