import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

const client = axios.create({
  baseURL: BASE_URL + '/api',
  withCredentials: false,
  timeout: 20000
});

client.interceptors.request.use((config)=>{
  const token = localStorage.getItem('auth_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

client.interceptors.response.use(
  res => res,
  err => {
    const msg = err?.response?.data?.message || err.message;
    console.warn('API error:', msg);
    return Promise.reject(err);
  }
);

export default client;
export const setToken = (token)=>{
  if (token) localStorage.setItem('auth_token', token);
  else localStorage.removeItem('auth_token');
}
export const getBaseUrl = ()=>BASE_URL;
