import axios from 'axios';

const API_KEY = 'AIzaSyAECVf-TnmQMfIgtaBx0r9dqR1kKh3FWhw';
const AUTH_URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
const TOKEN_URL = 'https://securetoken.googleapis.com/v1';

var authAxios = axios.create({
  baseURL: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty',
  timeout: 1000
});

export const login = (authData) => {
  return authAxios.post(`${AUTH_URL}/verifyPassword?key=${API_KEY}`, {
    email: authData.email,
    password: authData.password,
    returnSecureToken: true
  });
};

export const register = (authData) => {
  return authAxios.post(`${AUTH_URL}/signupNewUser?key=${API_KEY}`, {
    email: authData.email,
    password: authData.password,
    returnSecureToken: true
  });
};

export const refreshToken = (refreshToken) => {
  return authAxios.post(`${TOKEN_URL}/token?key=${API_KEY}`, {
    grant_type: 'refresh_token',
    refresh_token: refreshToken
  });
};

export const autoReconnect = () => {
  //TODO: create auto reconnect function using refreshToken
};