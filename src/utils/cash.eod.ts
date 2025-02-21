import path from 'path';
import fs from 'fs/promises';
import { smartcoreApi } from '../services/smartcore.api.js';
import { generateExcelFile } from './excelGenerator.js';
import { createCashTab } from './tabs/cash.tab.js';
import logger from './logger.js';
import { Cash, Investment, Transaction } from '../common/types';
import { createClientCashTab } from './tabs/clientcash.tab.js';
import { createClientActivityTab } from './tabs/clientactivity.tab.js';
import { createClientCreditBalancesTab } from './tabs/clientcreditbalances.tab.js';
import { createClientDebitsBalancesTab } from './tabs/clientdebitbalances.tab.js';
import { createSummaryTab } from './tabs/cashsummary.tab.js';
/**
 * Generates an Excel file with cash reconciliation data
 */
export async function generateCashReport(): Promise<void> {
  try {
    logger.info('Starting cash reconciliation report generation');

    const reconciliationId = '52';

    // Fetch data in parallel for better performance
    const [cashResponse, investmentsResponse, transactionsReponse] = await Promise.all([
      smartcoreApi.getReconciliationCash(reconciliationId),
      smartcoreApi.getInvestments(),
      smartcoreApi.getTransactions(),
    ]);

    console.log('here -> ', transactionsReponse);

    // Parse responses and handle type coercion
    const cashes: Cash[] =
      typeof cashResponse.data === 'string' ? JSON.parse(cashResponse.data) : cashResponse.data;

    const investments: Investment[] =
      typeof investmentsResponse === 'string'
        ? JSON.parse(investmentsResponse)
        : investmentsResponse;

    const transactions: Transaction[] =
      typeof transactionsReponse === 'string'
        ? JSON.parse(transactionsReponse)
        : transactionsReponse;

    // Create lookup map for faster filtering
    const investmentsByUserId = investments.reduce((acc, inv) => {
      if (!acc[inv.user_id]) {
        acc[inv.user_id] = [];
      }
      acc[inv.user_id].push(inv);
      return acc;
    }, {} as Record<number, Investment[]>);

    // Map cash data with associated investments
    const data = cashes.map(cash => ({
      ...cash,
      investments: investmentsByUserId[cash.id] || [],
    })) as Cash[]; // Cast the result to Cash[] since we're adding investments to the Cash type

    // Save JSON response
    const timestamp = new Date()
      .toLocaleString('en-GB', { hour12: false })
      .replace(/[/,]/g, '-')
      .replace(/:/g, '');
    const jsonPath = path.join(
      process.cwd(),
      'output',
      `cash-${reconciliationId}-${timestamp}.json`
    );

    await fs.mkdir(path.join(process.cwd(), 'output'), { recursive: true });
    await fs.writeFile(jsonPath, JSON.stringify(data, null, 2), 'utf8');

    // Create tabs
    const tabs = [
      createSummaryTab(data),
      createCashTab(data),
      createClientCashTab(data),
      createClientActivityTab(data),
      createClientCreditBalancesTab(transactions),
      createClientDebitsBalancesTab(transactions),
    ];

    // Generate Excel
    const excelPath = path.join(
      process.cwd(),
      'output',
      `cash-reconciliation-${reconciliationId}-${timestamp}.xlsx`
    );
    await generateExcelFile(excelPath, tabs);

    logger.info(`Reports generated:
      JSON: ${jsonPath}
      Excel: ${excelPath}`);
  } catch (error) {
    logger.error('Failed to generate cash reports:', error);
    throw error;
  }
}
