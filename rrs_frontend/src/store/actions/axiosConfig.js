
import axios from 'axios';

/**
 * Axios instance configuration
 */
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
  timeout: 10000, 
});

export default instance;
