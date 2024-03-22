import React, { useState } from "react";
import './Login.css';
import {request, setAuthHeader} from '../../api/axiosConfig.js';
import {setUserRole, setUserName} from "../../User";

const Login = () => {

    const [email, setEmail] = useState("");

    function isValidForm() {
        if (email === "") {
            alert("Email cannot be empty.");
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
                email: email
            }

            const response = await request("POST", "/api/register/forgot-password", payload);

            console.log(response.data.toString());

            alert(response.data.toString())
        } catch (err) {
            alert(err);
        }
    }

    return (
        <div className="login-form-container">
            <form className="login-form">
                <h3 className="web-title">Forgot Password</h3>
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