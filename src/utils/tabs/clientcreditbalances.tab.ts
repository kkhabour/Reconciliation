import { Transaction, TabData } from '../../common/types';

/**
 * Extracts column headers for the client credits tab
 */
function getColumnHeaders(): string[] {
  return [
    'Client ID',
    'Transaction ID',
    'Activity Type',
    'Details',
    'Amount',
    'Date'
  ];
}

/**
 * Transforms a transaction into a table row
 */
function transformTransactionToRow(transaction: Transaction): any[] {
  const baseStyle = { numFmt: '"$"#,##0.00' };
  const nullUserStyle = {
    ...baseStyle,
    fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF0000' } },
    font: { color: { argb: 'FFFFFFFF' } }
  };

  return [
    { 
      value: transaction.user_id ? `C${transaction.user_id}` : 'N/A',
      style: transaction.user_id ? undefined : nullUserStyle
    },
    transaction.id,
    transaction.tag,
    transaction.label,
    { 
      value: transaction.amount, 
      style: transaction.user_id ? baseStyle : nullUserStyle 
    },
    { value: new Date(transaction.created_at), style: { numFmt: 'yyyy-mm-dd hh:mm:ss' } }
  ];
}

/**
 * Creates the Client Credits tab data
 */
export function createClientCreditBalancesTab(transactions: Transaction[]): TabData {



// Filter transactions by side = 'CREDIT'
const creditTransactions = transactions.filter(transaction => transaction.side === 'CREDIT');



  const rows = creditTransactions.map(transformTransactionToRow);
  const totalRowNumber = rows.length + 2;

  // Add total row
  const totalRow = [
    'Total',
    '',
    '',
    '',
    { value: { formula: `SUM(E2:E${totalRowNumber-1})` }, style: { numFmt: '"$"#,##0.00' } },
    ''
  ];

  rows.push(totalRow);

  return {
    sheetName: 'Client Credits',
    headers: getColumnHeaders(),
    data: rows,
    columnStyles: {
      5: { numFmt: '"$"#,##0.00' },     // Amount column
      6: { numFmt: 'yyyy-mm-dd hh:mm:ss' }  // Date column
    }
  };
}
