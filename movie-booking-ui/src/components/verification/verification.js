import React, { useState } from "react";
import "./verification.css";

const Verification = () => {
  const [inputValues, setInputValues] = useState(["", "", "", "", "", ""]);
  const [isButtonActive, setButtonActive] = useState(false);

  const handleInputChange = (index, value) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newInputValues = [...inputValues];
      newInputValues[index] = value;
      setInputValues(newInputValues);

      if (index < 5 && value.length === 1) {
        document.getElementById(`input-${index + 1}`).focus();
      } else {
        setButtonActive(newInputValues.every((val) => val !== ""));
      }
    }
  };

  return (
    <div className="verificationBody">
      <div className="formContainer">
        <h4>Enter the 6 Digit Verification Code</h4>

        <form action="#">
          <div className="input_fields">
            {inputValues.map((value, index) => (
              <input
                key={index}
                id={`input-${index}`}
                type="text"
                value={value}
                onChange={(e) => handleInputChange(index, e.target.value)}
                maxLength="1"
              />
            ))}
          </div>

          <button className={isButtonActive ? "active" : ""}>Verify</button>
        </form>
      </div>
    </div>
  );
};

export default Verification;






