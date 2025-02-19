import { generateExcelFile } from './utils/excelGenerator';
import logger from './utils/logger';
import { config } from './config/index';
import { login } from './services/dataService';

async function main(): Promise<void> {
  logger.info('Logging in to Smartcore system...');
  try {
    const loginData = await login();
    logger.info('Login successful:', loginData);

    logger.info('Generating Excel file...');

    const dynamicSheets = [
      {
        sheetName: 'Positions Reconciliation',
        headers: ['Symbol', 'Position', 'Broker'],
        data: [
          ['AAPL', 100, 'Broker A'],
          ['GOOGL', 50, 'Broker B']
        ]
      },
      {
        sheetName: 'Aggregate Client Holdings',
        headers: ['Client', 'Total Holdings'],
        data: [
          ['Client X', 150],
          ['Client Y', 200]
        ]
      },
      {
        sheetName: 'Individual Client Holdings',
        headers: ['Client', 'Symbol', 'Quantity'],
        data: [
          ['Client X', 'AAPL', 80],
          ['Client Y', 'GOOGL', 120]
        ]
      },
      {
        sheetName: 'Broker Positions',
        headers: ['Broker', 'Position'],
        data: [
          ['Broker A', 300],
          ['Broker B', 250]
        ]
      }
    ];

    const filePath = config.excelFilePath || 'data.xlsx';
    await generateExcelFile(filePath, dynamicSheets);
    logger.info(`Excel file generated successfully at ${filePath}`);
  } catch (error) {
    logger.error('Error generating Excel file:', error);
  }
}

main(); 