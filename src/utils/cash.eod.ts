import path from 'path';
import fs from 'fs/promises';
import { smartcoreApi } from '../services/smartcore.api.js';
import { generateExcelFile } from './excelGenerator.js';
import { createCashTab } from './tabs/cash.tab.js';
import logger from './logger.js';
import { Cash } from '../common/types';

/**
 * Generates an Excel file with cash reconciliation data
 */
export async function generateCashReport(): Promise<void> {
  try {
    logger.info('Starting cash reconciliation report generation');
    
    const reconciliationId = '52';
    const {data: response} = await smartcoreApi.getReconciliationCash(reconciliationId);
    
    // Parse response if needed
    const data: Cash[] = typeof response === 'string' ? JSON.parse(response) : response;
    

    // Log first element to check response schema
    logger.info('First cash record:', JSON.stringify(data[0], null, 2));
    // Save JSON response
    const timestamp = new Date().toLocaleString('en-GB', { hour12: false }).replace(/[/,]/g, '-').replace(/:/g, '');
    const jsonPath = path.join(process.cwd(), 'output', `cash-${reconciliationId}-${timestamp}.json`);
    
    await fs.mkdir(path.join(process.cwd(), 'output'), { recursive: true });
    await fs.writeFile(jsonPath, JSON.stringify(data, null, 2), 'utf8');
    
    // Create tabs
    const tabs = [
      createCashTab(data)
    ];

    // Generate Excel
    const excelPath = path.join(process.cwd(), 'output', `cash-reconciliation-${reconciliationId}-${timestamp}.xlsx`);
    await generateExcelFile(excelPath, tabs);
    
    logger.info(`Reports generated:
      JSON: ${jsonPath}
      Excel: ${excelPath}`);
  } catch (error) {
    logger.error('Failed to generate cash reports:', error);
    throw error;
  }
} 