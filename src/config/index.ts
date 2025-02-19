import dotenv from 'dotenv';
dotenv.config();

export interface Config {
  apiUrl: string;
  excelFilePath: string;
  smartcoreBaseUrl: string;
  smartcoreEmail: string;
  smartcorePassword: string;
}

export const config: Config = {
  apiUrl: process.env.API_URL || 'https://api.example.com/data',
  excelFilePath: process.env.EXCEL_FILE_PATH || 'data.xlsx',
  smartcoreBaseUrl: process.env.SMARTCORE_BASE_URL || 'https://smartcore.prod.finamaze.com/',
  smartcoreEmail: process.env.SMARTCORE_EMAIL || 'user@example.com',
  smartcorePassword: process.env.SMARTCORE_PASSWORD || 'stringst'
}; 