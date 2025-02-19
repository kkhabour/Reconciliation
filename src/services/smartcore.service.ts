import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { config } from '../config/index.js';
import logger from '../utils/logger.js';

// Types
interface TokenResponse {
  access_token: string;
  refresh_token: string;
  csrf_token: string;
}

interface RequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// Token storage
let currentToken: string | null = null;
let isRefreshing = false;
let refreshQueue: ((token: string) => void)[] = [];

// Create axios instance
const client: AxiosInstance = axios.create({
  baseURL: config.smartcoreBaseUrl,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

/**
 * Performs login to get access token
 */
const login = async (): Promise<TokenResponse> => {
  try {
    if (!config.smartcoreEmail || !config.smartcorePassword) {
      throw new Error('Missing Smartcore credentials in environment variables');
    }

    logger.info(`Attempting login to: ${config.smartcoreBaseUrl}/api/v1/auth/login`);

    const response = await client.post<TokenResponse>(
      '/api/v1/auth/login',
      {
        email: config.smartcoreEmail,
        password: config.smartcorePassword,
      }
    );

    currentToken = response.data.access_token;
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorInfo = {
        status: error.response?.status,
        url: error.config?.url,
        message: error.message,
      };
      logger.error(`Login failed: ${JSON.stringify(errorInfo, null, 2)}`);
    } else {
      logger.error(`Login failed with non-Axios error: ${JSON.stringify(error, null, 2)}`);
    }
    throw error;
  }
};

// Add token to requests
client.interceptors.request.use(
  (config: RequestConfig) => {
    // Format request details into a single string
    const requestInfo = {
      method: config.method?.toUpperCase(),
      url: `${config.baseURL}${config.url}`,
      headers: {
        ...config.headers,
        Authorization: config.headers.Authorization ? '[REDACTED]' : undefined,
      },
      data: config.url?.includes('login') 
        ? { ...config.data, password: '[REDACTED]' }
        : config.data,
    };

    logger.info(`Outgoing request: ${JSON.stringify(requestInfo, null, 2)}`);

    if (currentToken) {
      config.headers.Authorization = `Bearer ${currentToken}`;
    }
    return config;
  },
  (error) => {
    logger.error(`Request interceptor error: ${JSON.stringify(error, null, 2)}`);
    return Promise.reject(error);
  }
);

/**
 * Format error details from various types of Axios errors
 */
const formatErrorDetails = (error: AxiosError) => {
  const details: Record<string, unknown> = {
    message: error.message,
    code: error.code,
  };

  // Add response error details if available
  if (error.response) {
    details.status = error.response.status;
    details.statusText = error.response.statusText;
    details.data = error.response.data;
  }

  // Add request details if available
  if (error.config) {
    details.method = error.config.method?.toUpperCase();
    details.url = `${error.config.baseURL}${error.config.url}`;
    
    // Redact sensitive data
    if (error.config.data) {
      const requestData = JSON.parse(error.config.data);
      details.requestData = error.config.url?.includes('login')
        ? { ...requestData, password: '[REDACTED]' }
        : requestData;
    }
  }

  return details;
};

// Response interceptor with comprehensive error handling
client.interceptors.response.use(
  // Success handler
  (response) => {
    const responseInfo = {
      status: response.status,
      url: `${response.config.baseURL}${response.config.url}`,
      method: response.config.method?.toUpperCase(),
    };

    logger.info(`Response received: ${JSON.stringify(responseInfo, null, 2)}`);
    return response;
  },
  // Error handler
  async (error: AxiosError) => {
    if (!error.response) {
      // Network error or request cancelled
      const networkError = {
        message: error.message,
        code: error.code,
      };
      logger.error(`Network or request error: ${JSON.stringify(networkError, null, 2)}`);
      return Promise.reject(error);
    }

    const errorDetails = formatErrorDetails(error);
    
    // Handle different error scenarios
    switch (error.response.status) {
      case 401:
        if (!(error.config as RequestConfig)?._retry) {
          logger.warn(`Authentication failed, attempting token refresh: ${JSON.stringify(errorDetails, null, 2)}`);
          return handleTokenRefresh(error);
        }
        logger.error(`Authentication failed after token refresh: ${JSON.stringify(errorDetails, null, 2)}`);
        break;
      
      case 403:
        logger.error(`Authorization error (Forbidden): ${JSON.stringify(errorDetails, null, 2)}`);
        break;
      
      case 404:
        logger.error(`Resource not found: ${JSON.stringify(errorDetails, null, 2)}`);
        break;
      
      case 429:
        logger.error(`Rate limit exceeded: ${JSON.stringify(errorDetails, null, 2)}`);
        break;
      
      case 500:
      case 502:
      case 503:
      case 504:
        logger.error(`Server error: ${JSON.stringify(errorDetails, null, 2)}`);
        break;
      
      default:
        logger.error(`Request failed: ${JSON.stringify(errorDetails, null, 2)}`);
    }

    return Promise.reject(error);
  }
);

/**
 * Handle token refresh logic
 */
const handleTokenRefresh = async (error: AxiosError) => {
  const originalRequest = error.config as RequestConfig;
  
  if (isRefreshing) {
    try {
      const token = await new Promise<string>((resolve) => {
        refreshQueue.push((token: string) => resolve(token));
      });
      originalRequest.headers.Authorization = `Bearer ${token}`;
      return client(originalRequest);
    } catch (err) {
      logger.error('Error while waiting for token refresh', err);
      return Promise.reject(err);
    }
  }

  isRefreshing = true;
  originalRequest._retry = true;

  try {
    const tokens = await login();
    currentToken = tokens.access_token;
    
    refreshQueue.forEach(callback => callback(currentToken!));
    refreshQueue = [];
    
    originalRequest.headers.Authorization = `Bearer ${currentToken}`;
    return client(originalRequest);
  } catch (refreshError) {
    logger.error('Token refresh failed:', refreshError);
    return Promise.reject(refreshError);
  } finally {
    isRefreshing = false;
  }
};

// Export the configured client and login function
export { client, login }; 