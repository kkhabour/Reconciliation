import { Holding, TabData, Broker } from '../../common/types';

/**
 * Extracts column headers from the first holding's brokers
 */
function getColumnHeaders(holding: Holding): string[] {
  const brokerNames = holding.brokers.map((b: Broker) => b.name);
  return ['Symbol', ...brokerNames, 'System', 'Difference'];
}

/**
 * Transforms a holding into a table row
 */
function transformHoldingToRow(holding: Holding, rowIndex: number): any[] {
  const currentRow = rowIndex + 2;
  
  return [
    holding.symbol,
    holding.brokers[0]?.broker || 0,  // ZAG broker value
    holding.brokers[1]?.broker || 0,  // GTN broker value
    holding.brokers[2]?.broker || 0,  // All broker value
    holding.brokers[2]?.system || 0,  // System value
    { formula: `D${currentRow}-E${currentRow}` }  // Difference formula
  ];
}

/**
 * Creates the Holdings tab data
 */
export function createHoldingsTab(data: Holding[]): TabData {
  const holdings = data
    .filter((item: Holding) => item.symbol !== 'total')
    .map((holding, index) => transformHoldingToRow(holding, index));

  // Calculate the row number for the total row
  const totalRowNumber = holdings.length + 2; // +2 for header row and 1-based indexing

  // Add total row
  const totalRow = [
    'Total',
    { formula: `SUM(B2:B${totalRowNumber-1})` },
    { formula: `SUM(C2:C${totalRowNumber-1})` },
    { formula: `SUM(D2:D${totalRowNumber-1})` },
    { formula: `SUM(E2:E${totalRowNumber-1})` },
    { formula: `SUM(F2:F${totalRowNumber-1})` }
  ];

  holdings.push(totalRow);

  return {
    sheetName: 'Holdings',
    headers: getColumnHeaders(data[0]),
    data: holdings
  };
} 