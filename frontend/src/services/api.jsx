import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:6000' });

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `bearer ${token}` };
};

export const register = (userData) => { API.post('user/register', userData) };