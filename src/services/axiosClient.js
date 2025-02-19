import axios from 'axios';
import { config } from '../config/index.js';

const axiosClient = axios.create({
  baseURL: config.smartcoreBaseUrl,
  timeout: 10000, // Optional timeout of 10 seconds
});

export default axiosClient; 