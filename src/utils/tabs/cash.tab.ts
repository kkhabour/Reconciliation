import { Cash, TabData } from '../../common/types';

/**
 * Extracts column headers for the cash tab
 */
function getColumnHeaders(): string[] {
  return [
    'Client ID',
    'Client Name',
    'System Balance',
    'Activity Balance',
    'Variance',
    'Status'
  ];
}

/**
 * Transforms a cash item into a table row
 */
function transformCashToRow(cashItem: Cash, rowIndex: number): any[] {
  return cashItem.accounts.map(account => {
    const currentRow = rowIndex + 2;
    return [
      `C${cashItem.id}`, 
      `${cashItem.first_name} ${cashItem.last_name}`,
      account.system.balance,
      account.activity.balance,
      { value: { formula: `C${currentRow}-D${currentRow}` } },
      { 
        value: { formula: `IF(E${currentRow}=0,"Yes","No")` },
        style: {
          fill: {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: account.difference.available === 0 ? 'FF92D050' : 'FFFF6B6B' }
          },
          font: { color: { argb: 'FFFFFFFF' }, bold: true },
          alignment: { horizontal: 'center' }
        }
      }
    ];
  });
}

/**
 * Creates the Cash tab data
 */
export function createCashTab(data: Cash[]): TabData {
  const cashRows = data.flatMap((item, index) => transformCashToRow(item, index));
  const totalRowNumber = cashRows.length + 2;

  // Add total row
  const totalRow = [
    'Total',
    '',
    { value: { formula: `SUM(C2:C${totalRowNumber-1})` }, style: { numFmt: '"$"#,##0.00' } },
    { value: { formula: `SUM(D2:D${totalRowNumber-1})` }, style: { numFmt: '"$"#,##0.00' } },
    { value: { formula: `C${totalRowNumber}-D${totalRowNumber}` }, style: { numFmt: '"$"#,##0.00' } },
    { 
      value: { formula: `IF(E${totalRowNumber}=0,"Yes","No")` },
      style: {
        fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF92D050' } },
        font: { color: { argb: 'FFFFFFFF' }, bold: true },
        alignment: { horizontal: 'center' }
      }
    }
  ];

  cashRows.push(totalRow);

  return {
    sheetName: 'Activity Vs Cash',
    headers: getColumnHeaders(),
    data: cashRows,
    columnStyles: {
      3: { numFmt: '"$"#,##0.00' },  // System Balance column (C)
      4: { numFmt: '"$"#,##0.00' },  // Activity Balance column (D)
      5: { numFmt: '"$"#,##0.00' }   // Variance column (E)
    }
  };
} 