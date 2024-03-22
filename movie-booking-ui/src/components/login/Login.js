import React, { useState } from "react";
import './Login.css';
import {request, setAuthHeader, setUserEmail} from '../../api/axiosConfig.js';
import {setUserRole, setUserName} from "../../User";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function isValidForm() {
        if (email === "") {
            alert("Email cannot be empty.");
            return false;
        }
        if (password === "") {
            alert("Password cannot be empty.");
            return false;
        }
        return true;
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (isValidForm()) {
            submit();

        }
    }

    async function submit() {
        try {

            const payload = {
                email: email,
                password: password
            }

            const response = await request("POST", "/api/register/login", payload);

            console.log(response.data.message);

            if (response.data.message == null) {
                setAuthHeader(response.data.token);
                setUserName(response.data.name);
                setUserRole(response.data.role);
                setUserEmail(response.data.email);

                alert("Logged in successfully.")
            } else {
                setAuthHeader(null);
                alert("Could not log in: " + response.data.message);

            }


        } catch (err) {
            alert(err);
        }
    }

    return (
        <div className="login-form-container">
            <form className="login-form">
            <h3 className="web-title">Log In</h3>
                <div className="login-form-content">
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="Enter email"

                            value={email}
                            onChange={ (event) => {
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
                            onChange={ (event) => {
                                setPassword(event.target.value);
                            }}
                        />
                    </div>
                    <p className="forgot-password-link text-right mt-2">
                        <a href="/forgot-password">Forgot Password?</a>
                    </p>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                    <p className="register-link">
                        Don't have an account? <a href="/register">Register</a>
                    </p>
                    
                </div>
            </form>
        </div>
    )
}

export default Login