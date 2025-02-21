import { Holding, TabData, Broker } from '../../common/types';

/**
 * Calculates summary statistics
 */
function createDetailedSummary(data: Holding[]): any[][] {
  const executionDate = new Date().toISOString().split('T')[0];
  const holdings = data.filter(item => item.symbol !== 'total');
  
  const matchingQuantities = holdings.filter(item => 
    item.brokers[1].broker === item.brokers[2].system
  ).length;

  const withBreaks = holdings.length - matchingQuantities;

  return [
    ['FinaMaze Client Assets Reconciliation'],
    [''],
    ['Reconciliation Date:', executionDate],
    ['Executed on:', new Date().toLocaleString()],
    [''],
    ['Number of Securities (Symbols) Held by Customers', holdings.length],
    ['Number of Securities (Symbols) Held at Brokers', holdings.length],
    ['Difference in Number of Securities (Symbols)', '0'],
    [''],
    ['Number of Securities with matching Quantities', matchingQuantities],
    ['Number of Securities with Position Breaks', withBreaks],
    [''],
    ['Number of Clients', '1'],
    ['Number of Clients with Position Breaks', withBreaks > 0 ? '1' : '0'],
    ['']
  ];
}

/**
 * Creates broker totals summary
 */
function createBrokerSummary(data: Holding[]): any[][] {
  const totalRow = data.find(item => item.symbol === 'total');
  if (!totalRow) return [];

  return [
    ['', 'System', 'Broker', 'Difference'],
    ...totalRow.brokers
      .filter((b: Broker) => b.name !== 'all')
      .map((broker: Broker) => [
        broker.name,
        broker.system || 0,
        broker.broker || 0,
        broker.difference || 0
      ])
  ];
}

/**
 * Creates the Summary tab data
 */
export function createSummaryTab(data: Holding[]): TabData {
  return {
    sheetName: 'Summary',
    headers: ['', '', '', ''],
    data: [
      ...createDetailedSummary(data),
    ]
  };
} 