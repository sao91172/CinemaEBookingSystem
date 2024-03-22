import React, { useState, useEffect } from "react";
import "./EditProfile.css";
import { request } from '../../api/axiosConfig.js';

const EditProfile = ({ userData }) => {
  const [cards, setCards] = useState([]);
  const [selectedCardIndex, setSelectedCardIndex] = useState(-1);
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [cvv, setCvv] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [state, setState] = useState("");
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [optIn, setOptIn] = useState("");

  useEffect(() => {
    const hardcodedCards = [
      {
        cardNumber: "1234567890123456",
        cardHolderName: "John Smith",
        cvv: "123",
        billingAddress: "123 Main St",
        expirationDate: "12/23",
        zipCode: "12345",
        state: "GA",
        email: "JohnSmith@example.com",
        optIn: true,
        password: "password",
      },
      {
        cardNumber: "9876543210987654",
        cardHolderName: "Jane Smith",
        cvv: "456",
        billingAddress: "123 Main St",
        expirationDate: "06/25",
        zipCode: "67890",
        state: "GA",
        email: "JohnSmith@example.com",
        optIn: false,
      },
      // Add more cards
    ];

    setCards(hardcodedCards);
    const defaultEmail =
      hardcodedCards.length > 0 ? hardcodedCards[0].email : "";
    setEmail(defaultEmail);

    if (userData && userData.length > 0) {
      setEmail(userData[0].email);
    }

    // const storedCards = JSON.parse(localStorage.getItem("cards") || "[]");
    // setCards(storedCards);

    // if (userData && userData.length > 0) {
    //   setFirstName(userData[0].name.split(" ")[0]);
    //   setLastName(userData[0].name.split(" ")[1]);
    //   setPassword(userData[0].password);
    // }
  }, [userData]);

  const saveCardsToLocalStorage = (cards) => {
    localStorage.setItem("cards", JSON.stringify(cards));
  };

  useEffect(() => {
    if (selectedCardIndex !== -1) {
      const selectedCard = cards[selectedCardIndex];

      if (selectedCard) {
        setCardNumber(selectedCard.cardNumber);
        setCardHolderName(selectedCard.cardHolderName);
        setCvv(selectedCard.cvv);
        setBillingAddress(selectedCard.billingAddress);
        setExpirationDate(selectedCard.expirationDate);
        setZipCode(selectedCard.zipCode);
        setState(selectedCard.state);
        setEmail(selectedCard.email);
        setOptIn(selectedCard.optIn);
      }
    } else {
      clearFormFields();
    }
  }, [selectedCardIndex, cards]);

  const clearFormFields = () => {
    setCardNumber("");
    setCardHolderName("");
    setCvv("");
    setBillingAddress("");
    setExpirationDate("");
    setZipCode("");
    setState("");
    setOptIn(false);
  };

  // const handleCardSelection = (event) => {
  //   const selectedCardIndex = event.target.value;
  //   setSelectedCardIndex(selectedCardIndex);

  //   // Check if the "Default" option is selected
  //   if (selectedCardIndex === "-1") {
  //     clearFormFields();
  //   }
  // };
  const handleCardSelection = (event) => {
    const selectedCardIndex = parseInt(event.target.value, 10);
    setSelectedCardIndex(selectedCardIndex);

    if (selectedCardIndex !== -1) {
      const selectedCard = cards[selectedCardIndex];

      if (selectedCard) {
        setCardNumber(selectedCard.cardNumber);
        setCardHolderName(selectedCard.cardHolderName);
        setCvv(selectedCard.cvv);
        setBillingAddress(selectedCard.billingAddress);
        setExpirationDate(selectedCard.expirationDate);
        setZipCode(selectedCard.zipCode);
        setState(selectedCard.state);
        setEmail(selectedCard.email);
        setOptIn(selectedCard.optIn);
      }
    } else {
      clearFormFields();
    }
  };

  const handlePaymentSubmit = (event) => {
    event.preventDefault();
    const newCard = {
      cardNumber,
      cardHolderName,
      cvv,
      billingAddress,
      expirationDate,
      zipCode,
      state,
      optIn,
      password,
    };

    if (selectedCardIndex !== -1) {
      cards[selectedCardIndex] = newCard;
    } else {
      if (cards.length < 3) {
        cards.push(newCard);
      }
    }

    saveCardsToLocalStorage(cards);
    clearFormFields();
  };

  const handleDeleteCard = () => {
    if (selectedCardIndex !== -1) {
      const newCards = [...cards];
      newCards.splice(selectedCardIndex, 1);
      if (selectedCardIndex === cards.length - 1) {
        setSelectedCardIndex(-1);
      }
      setCards(newCards);
      clearFormFields();
      saveCardsToLocalStorage(newCards);
    }
  };

  function handleChangePassword(event) {
    event.preventDefault;
    submitPasswordForm();
  }
  async function submitPasswordForm() {
    try {
      const payload = {
        email: email,
        element: password
      };
      const response = await request(
        "POST",
        "/api/users/change-password",
        payload
      );
      alert(response.data.toString());
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div>
      <div style={{ backgroundColor: "#000217" }}>
        <h1>Edit Profile</h1>
        <form onSubmit={handlePaymentSubmit} className="payment-form">
          <div className="input-group">
            <label>Card Number:</label>
            <input
              type="text"
              className="payment-input"
              placeholder="Enter Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Cardholder Name:</label>
            <input
              type="text"
              className="payment-input"
              placeholder="Cardholder Name"
              value={cardHolderName}
              onChange={(e) => setCardHolderName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>CVV:</label>
            <input
              type="text"
              className="payment-input"
              placeholder="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Expiration Date:</label>
            <input
              type="text"
              className="payment-input"
              placeholder="Expiration Date"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Billing Address:</label>
            <input
              type="text"
              className="payment-input"
              placeholder="Billing Address"
              value={billingAddress}
              onChange={(e) => setBillingAddress(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Zip Code:</label>
            <input
              type="text"
              className="payment-input"
              placeholder="ZIP Code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>State:</label>
            <input
              type="text"
              className="payment-input"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              className="payment-input"
              placeholder="Email"
              value={email}
              disabled
              onChange={(e) => setEmail(e.target.value)}
              style={{ color: "white" }}
            />
          </div>

          <div className="input-group">
            <div className="password-btn">
              <label>Password:</label>
              <input
                type="text"
                className="payment-input"
                placeholder="Existing Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="edit-pass-btn"
                onClick={handleChangePassword}
              >
                Change Password
              </button>
            </div>
          </div>

          <div className="input-group">
            <label>Existing Payments:</label>
            <select onChange={handleCardSelection}>
              <option value="-1">Add a New Card </option>
              {cards.map((card, index) => (
                <option key={index} value={index}>
                  {`Card ending in ${card.cardNumber.slice(-4)}`}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label>Opt-In/Opt-Out of Promotions:</label>

            <input
              type="checkbox"
              checked={optIn}
              onChange={(e) => setOptIn(e.target.checked)}
            />
          </div>

          <div className="input-group">
            <div className="edit-profile-btn-grp">
              <button
                type="button"
                className="edit-profile-btn"
                onClick={handleDeleteCard}
                disabled={selectedCardIndex === -1}
              >
                Delete Card
              </button>
            </div>
          </div>

          <div className="input-group">
            <div className="edit-profile-btn-grp">
              <button type="submit" className="edit-profile-btn">
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
