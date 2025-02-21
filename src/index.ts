import logger from './utils/logger.js';
import { assetsEod } from './utils/assets.eod.js';
import { generateCashReport } from './utils/cash.eod.js';
async function main(): Promise<void> {
  logger.info('Main function started');
  try {
    // await assetsEod();
    await generateCashReport();
    // Now client is configured with the token and ready to use
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.error(`Error in main: ${errorMessage}`);
    process.exit(1);
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
  logger.error('Unhandled promise rejection:', error);
  process.exit(1);
});

main().catch((unhandledError) => {
  logger.error('Unhandled error in main:', unhandledError);
  process.exit(1);
}); 