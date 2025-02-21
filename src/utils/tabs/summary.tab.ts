import { Holding, TabData, Broker } from '../../common/types';

/**
 * Calculates summary statistics
 */
function createDetailedSummary(data: Holding[]): any[][] {
  const executionDate = new Date().toISOString().split('T')[0];
  const holdings = data.filter(item => item.symbol !== 'total');

  const matchingQuantities = holdings.filter(
    item => item.brokers[1].broker === item.brokers[2].system
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
    [''],
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
        broker.difference || 0,
      ]),
  ];
}

/**
 * Creates the Summary tab data
 */
export function createSummaryTab(data: Holding[]): TabData {
  const executedDate = new Date().toLocaleString('en-GB', { hour12: false });
  const reconciliationDate = new Date().toLocaleDateString('en-GB');

  const titleStyle = {
    font: { bold: true, size: 20 },
    alignment: { horizontal: 'center' },
  };

  const sectionTitleStyle = {
    font: { bold: true, size: 12 },
    fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE0E0E0' } },
  };

  const labelStyle = {
    font: { bold: true },
    alignment: { horizontal: 'right' },
  };

  const holdings = data.filter(item => item.symbol !== 'total');
  const matchingQuantities = holdings.filter(
    item => item.brokers[1].broker === item.brokers[2].system
  ).length;
  const withBreaks = holdings.length - matchingQuantities;

  const rows = [
    [{ value: 'FinaMaze Client Assets Reconciliation', style: titleStyle }, ''],
    ['', ''],
    [{ value: 'Reconciliation Date:', style: labelStyle }, reconciliationDate],
    [{ value: 'Executed on:', style: labelStyle }, executedDate],
    ['', ''],
    [{ value: 'Summary', style: sectionTitleStyle }, ''],
    [
      { value: 'Number of Securities (Symbols) Held by Customers', style: labelStyle },
      { value: holdings.length, style: { numFmt: '0' } },
    ],
    [
      { value: 'Number of Securities (Symbols) Held at Brokers', style: labelStyle },
      { value: holdings.length, style: { numFmt: '0' } },
    ],
    [
      { value: 'Difference in Number of Securities (Symbols)', style: labelStyle },
      {
        value: 0,
        style: {
          numFmt: '0',
          fill: {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFFF0000' }, // Default red
          },
          font: {
            color: { argb: 'FFFFFFFF' }, // Default white
          },
          protection: {
            locked: false,
          },
          conditionalFormats: [
            {
              type: 'cellIs',
              operator: 'greaterThanOrEqual',
              formula: ['0'],
              style: {
                fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF92D050' } },
                font: { color: { argb: 'FF000000' } },
              },
            },
          ],
        },
      },
    ],
    ['', ''],
    [{ value: 'Statistics', style: sectionTitleStyle }, ''],
    [
      { value: 'Number of Securities with matching Quantities', style: labelStyle },
      { value: matchingQuantities, style: { numFmt: '0' } },
    ],
    [
      { value: 'Number of Securities with Position Breaks', style: labelStyle },
      { value: withBreaks, style: { numFmt: '0' } },
    ],
    ['', ''],
    [
      { value: 'Number of Clients', style: labelStyle },
      { value: 1, style: { numFmt: '0' } },
    ],
    [
      { value: 'Number of Clients with Position Breaks', style: labelStyle },
      { value: withBreaks > 0 ? 1 : 0, style: { numFmt: '0' } },
    ],
  ];

  return {
    sheetName: 'Summary',
    headers: [], // No headers needed for this tab
    data: rows,
    columnStyles: {
      1: { alignment: { horizontal: 'right' } }, // Align all labels to right
      2: { numFmt: '0' }, // Format second column as numbers
    },
  };
}
