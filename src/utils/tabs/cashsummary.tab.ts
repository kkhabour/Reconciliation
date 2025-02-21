import { Cash, TabData } from '../../common/types';

/**
 * Creates the Summary tab data
 */
export function createSummaryTab(data: Cash[]): TabData {
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

  const rows = [
    [{ value: 'FinaMaze Client Cash Reconciliation', style: titleStyle }, ''],
    ['', ''],
    [{ value: 'Reconciliation Date:', style: labelStyle }, reconciliationDate],
    [{ value: 'Executed on:', style: labelStyle }, executedDate],
    ['', ''],
    [{ value: 'Summary', style: sectionTitleStyle }, ''],
    [
      { value: 'Sum of All Clients Internal Cash Balances', style: labelStyle },
      { value: { formula: "'Client Cash'!G190" }, style: { numFmt: '"$"#,##0.00' } },
    ],
    [
      { value: 'Sum of All Clients 3rd Party Cash Balances', style: labelStyle },
      { value: 0, style: { numFmt: '"$"#,##0.00' } },
    ],
    [
      { value: 'Difference', style: labelStyle },
      {
        value: { formula: 'B8-B9' },
        style: {
          numFmt: '"$"#,##0.00',
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
          // Add conditional format to be handled by Excel
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
      { value: 'Number of Clients', style: labelStyle },
      { value: 0, style: { numFmt: '0' } },
    ],
    [
      { value: 'Clients with Activity matching Cash Balance', style: labelStyle },
      { value: 0, style: { numFmt: '0' } },
    ],
    [
      { value: 'Clients with Breaks', style: labelStyle },
      { value: 0, style: { numFmt: '0' } },
    ],
    [
      { value: 'Total Amount of Breaks', style: labelStyle },
      { value: 0, style: { numFmt: '"$"#,##0.00' } },
    ],
    ['', ''],
    [
      { value: 'All Clients 3rd Party Cash Balances:', style: labelStyle },
      { value: 0, style: { numFmt: '"$"#,##0.00' } },
    ],
  ];

  return {
    sheetName: 'Summary',
    headers: [], // No headers needed for this tab
    data: rows,
    columnStyles: {
      1: { alignment: { horizontal: 'right' } }, // Align all labels to right
      2: { numFmt: '"$"#,##0.00' }, // Format second column as currency where needed
    },
  };
}
