import React, { useState, useEffect } from "react";

const PaymentForm = ({ existingCards, selectedCard, handleCardSelection }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [cvv, setCvv] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [state, setState] = useState("");

  useEffect(() => {
    if (selectedCard) {
      // Autofill the form fields with the selected card's data
      setCardNumber(selectedCard.cardNumber);
      setCardHolderName(selectedCard.cardHolderName);
      setCvv(selectedCard.cvv);
      setBillingAddress(selectedCard.billingAddress);
      setExpirationDate(selectedCard.expirationDate);
      setZipCode(selectedCard.zipCode);
      setState(selectedCard.state);
    } else {
      // Clear the form fields when no card is selected
      setCardNumber("");
      setCardHolderName("");
      setCvv("");
      setBillingAddress("");
      setExpirationDate("");
      setZipCode("");
      setState("");
    }
  }, [selectedCard]);

  const handlePaymentSubmit = (event) => {
    event.preventDefault();
    // Validate and process payment logic here


  };

  return (
    <div>
      <h3 className="payment">Payment Information</h3>
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
          <label>Saved Payments:</label>
          <select onChange={handleCardSelection}>
            <option value="" disabled>
              Select an existing card
            </option>
            <option value="none">New Payment</option>
            {existingCards.map((card) => (
              <option key={card.id} value={card.id}>
                {`Card ending in ${card.cardNumber.slice(-4)}`}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
