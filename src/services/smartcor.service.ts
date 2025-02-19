import axios, { AxiosInstance } from 'axios';
import { config } from '../config/index.js';

const smartcoreService: AxiosInstance = axios.create({
  baseURL: config.smartcoreBaseUrl,
  timeout: 10000 // Optional timeout of 10 seconds
});

/**
 * Performs login to the Smartcore system.
 * Sends a POST request to /api/v1/auth/login with the following payload:
 * {
 *   "email": "<SMARTCORE_EMAIL>",
 *   "password": "<SMARTCORE_PASSWORD>"
 * }
 *
 * The credentials are loaded from the environment variables.
 *
 * @returns {Promise<any>} Response data from the login request
 */
export async function login(): Promise<any> {
  const payload = {
    email: config.smartcoreEmail,
    password: config.smartcorePassword,
  };

  try {
    const response = await smartcoreService.post('/api/v1/auth/login', payload);
    return response.data;
  } catch (error: unknown) {
    // Optionally log the error if needed
    throw error;
  }
}

export default { login }; 