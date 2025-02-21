import { Cash, TabData } from '../../common/types';

/**
 * Extracts column headers for the client activity tab
 */
function getColumnHeaders(): string[] {
  return [
    'Client Account',
    'Client Name',
    'Credits',
    'Debits',
    'Pending',
    'Total'
  ];
}

/**
 * Transforms a cash item into a table row
 */
function transformClientActivityToRow(cashItem: Cash, rowIndex: number): any[] {
  const currentRow = rowIndex + 2;
  
  // Sum activity values across all accounts
  const credits = cashItem.accounts.reduce((sum, acc) => sum + acc.activity.credit, 0);
  const debits = cashItem.accounts.reduce((sum, acc) => sum + acc.activity.debit, 0);
  const pending = cashItem.accounts.reduce((sum, acc) => sum + acc.activity.reserved, 0);
  const total = credits - debits + pending;

  return [
    `C${cashItem.id}`,
    `${cashItem.first_name} ${cashItem.last_name}`,
    { value: credits, style: { numFmt: '"$"#,##0.00' } },
    { value: debits, style: { numFmt: '"$"#,##0.00' } },
    { value: pending, style: { numFmt: '"$"#,##0.00' } },
    { 
      value: { formula: `C${currentRow}-D${currentRow}+E${currentRow}` },
      style: {
        numFmt: '"$"#,##0.00',
        fill: total < 0 ? { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF0000' } } : undefined,
        font: total < 0 ? { color: { argb: 'FFFFFFFF' } } : undefined
      }
    }
  ];
}

/**
 * Creates the Client Activity tab data
 */
export function createClientActivityTab(data: Cash[]): TabData {
  const rows = data.map((item, index) => transformClientActivityToRow(item, index));
  const totalRowNumber = rows.length + 2;

  // Add total row
  const totalRow = [
    'Total',
    '',
    { value: { formula: `SUM(C2:C${totalRowNumber-1})` }, style: { numFmt: '"$"#,##0.00' } },
    { value: { formula: `SUM(D2:D${totalRowNumber-1})` }, style: { numFmt: '"$"#,##0.00' } },
    { value: { formula: `SUM(E2:E${totalRowNumber-1})` }, style: { numFmt: '"$"#,##0.00' } },
    { value: { formula: `SUM(F2:F${totalRowNumber-1})` }, style: { numFmt: '"$"#,##0.00' } }
  ];

  rows.push(totalRow);

  return {
    sheetName: 'Client Activity',
    headers: getColumnHeaders(),
    data: rows,
    columnStyles: {
      3: { numFmt: '"$"#,##0.00' },  // Credits
      4: { numFmt: '"$"#,##0.00' },  // Debits
      5: { numFmt: '"$"#,##0.00' },  // Pending
      6: { numFmt: '"$"#,##0.00' }   // Total
    }
  };
}
