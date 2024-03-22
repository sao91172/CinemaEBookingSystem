import React, {useEffect, useState} from "react";
import "./Checkout.css";
import PaymentForm from "./PaymentForm";
import {request} from "../../api/axiosConfig";
import {useNavigate} from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Initial loading state
  const [prices, setPrices] = useState();

  const [tickets, setTickets] = useState([]);

  const [existingCardsData, setExistingCardsData] = useState([
    {
      id: 1,
      cardNumber: "1234 5678 9012 3456",
      cardHolderName: "John Doe",
      cvv: "123",
      billingAddress: "123 Main St",
      expirationDate: "12/25",
      zipCode: "12345",
      state: "GA",
    },
    // Add more existing card data
  ]);

  const [promoCode, setPromoCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [taxRate] = useState(0.1); // 10% tax rate

  const storedQuantities = JSON.parse(localStorage.getItem('ticketCounts')) || {};

  useEffect(() => {
    getPrices();
    // getExistingCards();
  }, []);

  useEffect(() => {
    if (prices) {
      buildTicketsList();
    }
  }, [prices]);

  function buildTicketsList() {
    let ticketsList = [
      { id: 1, name: "Adult", price: prices[0].price, quantity: storedQuantities.adult || 0},
      { id: 2, name: "Child", price: prices[1].price, quantity: storedQuantities.child || 0 },
      { id: 3, name: "Senior", price: prices[2].price, quantity: storedQuantities.senior || 0 }
    ]

    setTickets(ticketsList);
  }

  const getExistingCards = async () => {
    setLoading(true);
    try {
      const payload = {
        email: window.localStorage.getItem('user_email')
      }
      const response = await request("POST", "/api/users/payment-cards", payload);
      setExistingCardsData(response.data);
      setLoading(false); // Set loading to false once the data is fetched
    } catch (err) {
      console.log(err);
      setLoading(false); // Set loading to false in case of an error
    }
  }

  const getPrices = async () => {
    setLoading(true);
    try {
      const response = await request("GET", "/api/payment/prices", );
      setPrices(response.data);
      setLoading(false); // Set loading to false once the data is fetched
    } catch (err) {
      console.log(err);
      setLoading(false); // Set loading to false in case of an error
    }
  }

  const calculateTicketTotal = () => {
    return tickets.reduce(
        (total, ticket) => total + ticket.price * ticket.quantity,
        0
    );
  };

  const calculateTax = () => {
    return calculateTicketTotal() * taxRate;
  };

  const calculateTotal = () => {
    return calculateTicketTotal() * (1 - (discountAmount / 100)) + calculateTax();
  };

  const orderTotal = calculateTotal();

  const [selectedCard, setSelectedCard] = useState(null);
  const handleCardSelection = (event) => {
    const selectedCardId = event.target.value;
    if (selectedCardId === "none") {
      setSelectedCard(null);
    } else {
      const selectedCardInfo = existingCardsData.find(
          (card) => card.id === parseInt(selectedCardId)
      );
      setSelectedCard(selectedCardInfo);
    }
  };

  const handleCheckout = () => {
    setLoading(true);
    processOrder(getRequestedSeats());
  };

  function getRequestedSeats() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')) || [];
    const chosenSeats = selectedSeats.map((seat) => {
      const rowLetter = String.fromCharCode('A'.charCodeAt(0) + seat.row - 1); // Convert row number to letter
      return `${rowLetter}${seat.seat}`;
    });

    let seatsString = "";
    for (let i = 0; i < chosenSeats.length; i++) {
      seatsString += chosenSeats[i];
      if (i !== chosenSeats.length) {
        seatsString += ",";
      }
    }
    return seatsString;
  }

  const processOrder = async (requestedSeats) => {
    setLoading(true);
    let promotionCode = null;
    if (promoCode !== "") {
      promotionCode = promoCode;
    }
    try {
      const payload = {
        email: window.localStorage.getItem('user_email'),
        adultQuantity: storedQuantities.adult,
        childQuantity: storedQuantities.child,
        seniorQuantity: storedQuantities.senior,
        requestedSeats: requestedSeats,
        movieId: window.localStorage.getItem('selectedMovie'),
        showingDateTime: window.localStorage.getItem('selectedShowtime'),
        paymentMethod: 2,
        promoCode: promotionCode
      }
      const response = await request("POST", "api/payment/place-order", payload);
      alert(response.data);

      setLoading(false);
      if (!response.data.startsWith("ERROR")) {
        window.localStorage.setItem("order_number", response.data.charAt(response.data.length-1))
        navigate('/confirmation'); // Navigate to the next page
      }
    } catch (err) {
      alert(err)
      setLoading(false);
    }
  }

  const getPromo = async () => {
    try {
      const payload = {
        element: promoCode
      }
      const response = await request("POST", "/api/payment/promotions/promotion", payload);

      if (response.data !== null) {
        setDiscountAmount(response.data.promoAmt)
        setLoading(false);
        alert("Promotion Applied.")
        return;
      }

      setDiscountAmount(0)
      setLoading(false);
      alert("Promotion code is invalid.")

    } catch (err) {
      setLoading(false);
      alert(err);
    }
  }

  const applyPromoCode = () => {
    setLoading(true);
    getPromo();
  };

  const removePromoCode = () => {
    setPromoCode("");
    setDiscountAmount(0);
  };

  return (
      <div>
        {loading ? (
            <p>Loading...</p>
        ) : (
            <div className="checkout-container">

              <h2>Order Summary</h2>
              <table className="ticket-table">
                <thead>
                <tr>
                  <th>Ticket</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </tr>
                </thead>
                <tbody>
                {tickets.map((ticket) => (
                    <tr key={ticket.id}>
                      <td>{ticket.name}</td>
                      <td>${ticket.price}</td>
                      <td>{ticket.quantity}</td>
                      <td>${ticket.price * ticket.quantity}</td>
                    </tr>
                ))}
                </tbody>
              </table>
              <div className="total">
                <p>Subtotal: ${calculateTicketTotal()}</p>
                <p>
                  Tax ({(taxRate * 100).toFixed(0)}%): ${calculateTax().toFixed(2)}
                </p>
                {discountAmount > 0 && <p>Discount: {discountAmount.toFixed(2)}%</p>}
                <p>Total: ${orderTotal.toFixed(2)}</p>
                {discountAmount > 0 && (
                    <button onClick={removePromoCode}>Remove Promo Code</button>
                )}
              </div>


              <div className="input-group">
                <label>Promotion Code:</label>
                <input
                    type="text"
                    placeholder="Enter Promo Code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                />
                <button  onClick={applyPromoCode}>Apply</button>
              </div>


              <PaymentForm
                  existingCards={existingCardsData}
                  selectedCard={selectedCard}
                  handleCardSelection={handleCardSelection}
              />

              <button className="checkout" onClick={handleCheckout}>Checkout</button>
            </div>
        )}
      </div>
  );
};

export default Checkout;

