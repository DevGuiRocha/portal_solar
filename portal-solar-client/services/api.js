import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // URL da API Rails
});

export default api;
