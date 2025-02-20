// Common types used across files
export interface TabData {
  sheetName: string;
  headers: string[];
  data: any[][];
}

export interface Broker {
  name: string;
  system: number;
  broker: number;
  difference: number;
}

export interface Holding {
  symbol: string;
  brokers: Broker[];
}

// Service types
export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// API client configuration
export interface ApiConfig {
  baseURL: string;
  headers: {
    'Content-Type': string;
    'Accept': string;
    'Authorization'?: string;
  };
}

// Error types
export interface ApiError {
  status?: number;
  message: string;
  code?: string;
  url?: string;
  data?: any;
} 