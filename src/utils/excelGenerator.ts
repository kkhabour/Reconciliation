import ExcelJS from 'exceljs';
import logger from './logger.js';
import { TabData } from '../common/types';

interface CellStyle {
  fill?: {
    type: 'pattern';
    pattern: 'solid';
    fgColor: { argb: string };
  };
  font?: {
    color?: { argb: string };
    bold?: boolean;
  };
  alignment?: {
    horizontal?: 'left' | 'center' | 'right';
    vertical?: 'top' | 'middle' | 'bottom';
  };
  numFmt?: string;
}

interface CellValue {
  value?: any;
  formula?: string;
  style?: CellStyle;
}

interface SheetConfig extends TabData {
  columnStyles?: { [key: number]: CellStyle };  // Column-level styles
}

/**
 * Adds a new worksheet with data and consistent styling
 */
async function addWorksheet(workbook: ExcelJS.Workbook, config: SheetConfig): Promise<void> {
  const { sheetName, headers, data, columnStyles = {} } = config;
  const sheet = workbook.addWorksheet(sheetName);

  // Add headers
  sheet.addRow(headers);
  const headerRow = sheet.getRow(1);
  headerRow.font = { bold: true };

  // Apply column styles if provided
  Object.entries(columnStyles).forEach(([colIndex, style]) => {
    const col = sheet.getColumn(Number(colIndex));
    Object.assign(col, style);
  });

  // Add data rows with custom styling
  data.forEach((rowData, rowIndex) => {
    const row = sheet.addRow([]);
    
    rowData.forEach((cell, colIndex) => {
      const cellRef = row.getCell(colIndex + 1);

      if (typeof cell === 'object' && cell !== null) {
        // Handle cell with formula and/or style
        if (cell.formula) {
          cellRef.value = { formula: cell.formula };
        } else if (cell.value !== undefined) {
          cellRef.value = cell.value;
        }

        // Apply custom cell style if provided
        if (cell.style) {
          Object.assign(cellRef, cell.style);
        }
      } else {
        // Handle simple value
        cellRef.value = cell;
      }

      // Apply column style if exists
      if (columnStyles[colIndex + 1]) {
        Object.assign(cellRef, columnStyles[colIndex + 1]);
      }
    });
  });
}

/**
 * Generates an Excel file with multiple sheets
 */
export async function generateExcelFile(
  filePath: string,
  sheets: SheetConfig[]
): Promise<void> {
  try {
    const workbook = new ExcelJS.Workbook();

    // Add each sheet
    for (const sheetConfig of sheets) {
      await addWorksheet(workbook, sheetConfig);
    }

    // Save the workbook
    await workbook.xlsx.writeFile(filePath);
    logger.info(`Excel file created: ${filePath}`);
  } catch (error) {
    logger.error('Failed to generate Excel file:', error);
    throw error;
  }
} 