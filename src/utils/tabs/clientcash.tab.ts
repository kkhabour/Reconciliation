import { Cash, TabData } from '../../common/types';

/**
 * Extracts column headers for the client cash tab
 */
function getColumnHeaders(): string[] {
  return [
    'Client Account',
    'Client Name',
    'Available Cash',
    'Reserved Cash',
    'Smartfolios Cash Residuals',
    'Uncalled Capital Amount',
    'Total Cash',
  ];
}

/**
 * Transforms a cash item into a table row
 */
function transformClientCashToRow(cashItem: Cash, rowIndex: number): any[] {
  const currentRow = rowIndex + 2;

  // Calculate totals from all accounts
  const availableCash = cashItem.accounts.reduce((sum, acc) => sum + acc.system.available, 0);
  const reservedCash = cashItem.accounts.reduce((sum, acc) => sum + acc.system.reserved, 0);

  // Sum all cash residuals from investments
  const cashResiduals = cashItem.investments?.reduce((sum, inv) => sum + inv.cash_residual, 0) || 0;

  // Calculate uncalled capital (placeholder - define the business logic)
  const uncalledCapital = 0; // TODO: Define calculation

  return [
    `C${cashItem.id}`,
    `${cashItem.first_name} ${cashItem.last_name}`,
    { value: availableCash, style: { numFmt: '"$"#,##0.00' } },
    { value: reservedCash, style: { numFmt: '"$"#,##0.00' } },
    { value: cashResiduals, style: { numFmt: '"$"#,##0.00' } },
    { value: uncalledCapital, style: { numFmt: '"$"#,##0.00' } },
    {
      value: { formula: `SUM(C${currentRow}:F${currentRow})` },
      style: { numFmt: '"$"#,##0.00' },
    },
  ];
}

/**
 * Creates the Client Cash tab data
 */
export function createClientCashTab(data: Cash[]): TabData {
  const rows = data.map((item, index) => transformClientCashToRow(item, index));
  const totalRowNumber = rows.length + 2;

  // Add total row
  const totalRow = [
    'Total',
    '',
    { value: { formula: `SUM(C2:C${totalRowNumber - 1})` }, style: { numFmt: '"$"#,##0.00' } },
    { value: { formula: `SUM(D2:D${totalRowNumber - 1})` }, style: { numFmt: '"$"#,##0.00' } },
    { value: { formula: `SUM(E2:E${totalRowNumber - 1})` }, style: { numFmt: '"$"#,##0.00' } },
    { value: { formula: `SUM(F2:F${totalRowNumber - 1})` }, style: { numFmt: '"$"#,##0.00' } },
    { value: { formula: `SUM(G2:G${totalRowNumber - 1})` }, style: { numFmt: '"$"#,##0.00' } },
  ];

  rows.push(totalRow);

  return {
    sheetName: 'Client Cash',
    headers: getColumnHeaders(),
    data: rows,
    columnStyles: {
      3: { numFmt: '"$"#,##0.00' }, // Available Cash
      4: { numFmt: '"$"#,##0.00' }, // Reserved Cash
      5: { numFmt: '"$"#,##0.00' }, // Smartfolios Cash Residuals
      6: { numFmt: '"$"#,##0.00' }, // Uncalled Capital Amount
      7: { numFmt: '"$"#,##0.00' }, // Total Cash
    },
  };
}
