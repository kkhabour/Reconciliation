import { Cash, TabData } from '../../common/types';

/**
 * Extracts column headers for the cash tab
 */
function getColumnHeaders(): string[] {
  return [
    'Client Account',
    'Available Cash',
    'Activity Total',
    'Difference',
    'Reconciled'
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
      account.system.balance,
      account.activity.balance,
      { formula: `B${currentRow}-C${currentRow}` },
      { 
        formula: `IF(D${currentRow}=0,"Yes","No")`,
        style: {
          fill: {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: `FF${account.difference.available === 0 ? '92D050' : 'FF6B6B'}` }
          },
          font: { 
            color: { argb: 'FFFFFFFF' },
            bold: true
          },
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
    { formula: `SUM(B2:B${totalRowNumber-1})` },
    { formula: `SUM(C2:C${totalRowNumber-1})` },
    { formula: `B${totalRowNumber}-C${totalRowNumber}` },
    { 
      formula: `IF(D${totalRowNumber}=0,"Yes","No")`,
      style: {
        fill: {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FF92D050' }  // Default to green for total row
        },
        font: { 
          color: { argb: 'FFFFFFFF' },
          bold: true
        },
        alignment: { horizontal: 'center' }
      }
    }
  ];

  cashRows.push(totalRow);

  return {
    sheetName: 'Activity Vs Cash',
    headers: getColumnHeaders(),
    data: cashRows
  };
} 