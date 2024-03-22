import React, { useState } from "react";
import "./Register.css";
import {Link} from "react-router-dom";
import {request} from '../../api/axiosConfig.js';

const Register = () => {
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPass, setVerifyPass] = useState("");

  function isValidForm() {
    if (customerName === "") {
      alert("Name cannot be empty.");
      return false;
    }
    if (email === "") {
      alert("Email cannot be empty.");
      return false;
    }
    if (password === "" || verifyPass === "") {
      alert("Password and verify password cannot be empty.");
      return false;
    } else if (password != verifyPass) {
      alert("Password and verify password need to match.");
      return false;
    }
    return true;
  }

  function handleSubmit(event) {
    event.preventDefault;
    if (isValidForm()) {
      submitForm();
    }
  }

  async function submitForm() {
    try {

      const payload = {
        name: customerName,
        email: email,
        password: password
      }
      const response = await request("POST", "/api/register", payload);
      alert(response.data.toString());

    } catch (err) {
      alert(err);
    }
  }

  return (
    <div className="register-form-container">
      <form className="register-form">
        <div className="register-form-content">
          <h3 className="web-title">Register</h3>
          <div className="form-group mt-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter Name"
              required={true}
              value={customerName}
              onChange={(event) => {
                setCustomerName(event.target.value);
              }}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              required={true}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>
          <div className="form-group mt-3 confirm-password-field">
            <label>Comfirm Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Confirm Password"
              value={verifyPass}
              onChange={(event) => {
                setVerifyPass(event.target.value);
              }}
            />
          </div>

          <div className="d-grid gap-2 mt-3">
            <Link to={`/login/`}>
              <button
                type="submit"
                className="submit-btn btn btn-primary"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </Link>
          </div>
          <p className="register-link">
            Already a member? <a href="/login">Log In</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
