import { Holding, TabData, Broker } from '../../common/types';

/**
 * Extracts column headers from the first holding's brokers
 */
function getColumnHeaders(holding: Holding): string[] {
  const brokerNames = holding.brokers.map((b: Broker) => b.name);
  return ['Symbol', ...brokerNames, 'System'];
}

/**
 * Transforms a holding into a table row
 */
function transformHoldingToRow(holding: Holding): any[] {
  return [
    holding.symbol,
    holding.brokers[0]?.broker || 0,  // ZAG broker value
    holding.brokers[1]?.broker || 0,  // GTN broker value
    holding.brokers[2]?.broker || 0,  // All broker value
    holding.brokers[2]?.system || 0   // System value
  ];
}

/**
 * Creates the Holdings tab data
 */
export function createHoldingsTab(data: Holding[]): TabData {
  const holdings = data
    .filter((item: Holding) => item.symbol !== 'total')
    .map(transformHoldingToRow);

  return {
    sheetName: 'Holdings',
    headers: getColumnHeaders(data[0]),
    data: holdings
  };
} 