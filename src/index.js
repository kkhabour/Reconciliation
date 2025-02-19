import { fetchData } from './services/dataService.js';
import { generateExcel } from './utils/excelUtils.js';
import { config } from './config/index.js';
import logger from './utils/logger.js';

async function main() {
  logger.info('Starting reconciliation process...');

  try {
    const data = await fetchData(config.apiUrl);
    await generateExcel(data, config.excelFilePath);
  } catch (error) {
    logger.error('Error in main function:', error);
  }
}

main(); 