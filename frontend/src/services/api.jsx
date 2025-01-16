import axios from 'axios';

// eslint-disable-next-line react-refresh/only-export-components
const API = axios.create({ baseURL: 'http://localhost:3000/api' });

export const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const register = userData => {
  try {
    API.post('/user/register', userData);
  } catch (err) {
    console.log('Error', err);
  }
};

export const login = async userData => {
  try {
    const res = API.post('/user/login', userData);
    return res ? res : {};
  } catch (err) {
    console.log('Error', err);
  }
};
