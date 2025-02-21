import ExcelJS from 'exceljs';
import logger from './logger.js';
import { TabData } from '../common/types';

interface SheetConfig {
  sheetName: string;
  headers: string[];
  data: any[][];
}

/**
 * Adds a new worksheet with data and consistent styling
 */
async function addWorksheet(workbook: ExcelJS.Workbook, config: SheetConfig): Promise<void> {
  const { sheetName, headers, data } = config;
  const sheet = workbook.addWorksheet(sheetName);

  // Set columns with number format
  sheet.columns = headers.map((header, index) => {
    const column: Partial<ExcelJS.Column> = {
      header,
      key: header.toLowerCase().replace(/ /g, '_'),
      width: 20
    };
    
    // Apply number format to specific columns
    if (index === 1 || index === 2 || index === 3) { // B, C, D columns
      column.style = { numFmt: '#,##0.00' };
    }
    
    return column;
  });

  // Add data rows
  sheet.addRows(data);

  // Style the header row
  const headerRow = sheet.getRow(1);
  headerRow.font = { bold: true };
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