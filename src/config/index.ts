import dotenv from 'dotenv';
dotenv.config();

export interface Config {
  excelFilePath: string;
  smartcoreBaseUrl: string;
  smartcoreEmail: string | undefined;
  smartcorePassword: string | undefined;
}

// Validate required environment variables
if (!process.env.SMARTCORE_BASE_URL || !process.env.SMARTCORE_EMAIL || !process.env.SMARTCORE_PASSWORD) {
  throw new Error('Missing required environment variables: SMARTCORE_BASE_URL, SMARTCORE_EMAIL, and/or SMARTCORE_PASSWORD');
}

export const config: Config = {
  excelFilePath: process.env.EXCEL_FILE_PATH || 'data.xlsx',
  smartcoreBaseUrl: process.env.SMARTCORE_BASE_URL.replace(/\/+$/, ''), // Remove trailing slashes
  smartcoreEmail: process.env.SMARTCORE_EMAIL,
  smartcorePassword: process.env.SMARTCORE_PASSWORD,
}; 