import { smartcoreApi } from '../services/smartcore.api.js';
import logger from './logger.js';
import fs from 'fs/promises';
import path from 'path';
import { generateExcelFile } from './excelGenerator';
import { createSummaryTab } from './tabs/summary.tab.js';
import { createHoldingsTab } from './tabs/holdings.tab.js';
import { Holding } from '../common/types';

/**
 * Gets holdings data and generates reports
 */
export async function assetsEod(): Promise<void> {
  try {
    logger.info('Starting holdings data retrieval...');
    
    const reconciliationId = '52';
    const response = await smartcoreApi.getReconciliationHoldings(reconciliationId);
    
    // Parse response if needed
    const data: Holding[] = typeof response === 'string' ? JSON.parse(response) : response;
    
    // Save JSON response
    const timestamp = new Date().toLocaleDateString('en-GB').replace(/\//g, ':');
    const jsonPath = path.join(process.cwd(), 'output', `holdings-${reconciliationId}-${timestamp}.json`);
    
    await fs.mkdir(path.join(process.cwd(), 'output'), { recursive: true });
    await fs.writeFile(jsonPath, JSON.stringify(data, null, 2), 'utf8');
    
    // Create tabs
    const tabs = [
      createSummaryTab(data),
      createHoldingsTab(data)
    ];

    // Generate Excel
    const excelPath = path.join(process.cwd(), 'output', `assets-reconciliation-${reconciliationId}-${timestamp}.xlsx`);
    await generateExcelFile(excelPath, tabs);
    
    logger.info(`Reports generated:
      JSON: ${jsonPath}
      Excel: ${excelPath}`);
  } catch (error) {
    logger.error('Failed to generate reports:', error);
    throw error;
  }
}
