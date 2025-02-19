import dotenv from 'dotenv';
dotenv.config();

export const config = {
  apiUrl: process.env.API_URL || 'https://api.example.com/data',
  excelFilePath: process.env.EXCEL_FILE_PATH || 'data.xlsx',
}; 