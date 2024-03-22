import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const getAuthToken = () => {
    return window.localStorage.getItem('auth_token');
}

export const setAuthHeader = (token) => {
    window.localStorage.setItem('auth_token', token);
}

export const setUserEmail = (email) => {
    window.localStorage.setItem('user_email', email);
}

export const getUserEmail = () => {
    return window.localStorage.getItem('user_email');
}

export const request = (method, url, payload) => {
    let headers = {};
    if (getAuthToken() !== null && getAuthToken() !== "null") {
        headers = {'Authorization': `Bearer ${getAuthToken()}`};
    }

    return axios({
        method: method,
        url: url,
        headers: headers,
        data: payload
    });
}
