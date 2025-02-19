import { generateExcelFile } from './utils/excelGenerator.js';
import logger from './utils/logger.js';
import { config } from './config/index.js';

async function main() {
  logger.info('Generating Excel file...');

  // Configure dynamic sheets with sample data.
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

  try {
    // Use the excel file path defined in the configuration (or default to 'output.xlsx').
    const filePath = config.excelFilePath || 'output.xlsx';
    await generateExcelFile(filePath, dynamicSheets);
    logger.info(`Excel file generated successfully at ${filePath}`);
  } catch (error) {
    logger.error('Error generating Excel file:', error);
  }
}

main(); 