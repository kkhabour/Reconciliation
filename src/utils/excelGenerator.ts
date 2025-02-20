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

  // Set columns
  sheet.columns = headers.map(header => ({
    header,
    key: header.toLowerCase().replace(/ /g, '_'),
    width: 20
  }));

  // Style header row
  sheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4472C4' } };
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
  });

  // Add data rows
  data.forEach(rowData => {
    const row = sheet.addRow(rowData);
    row.eachCell((cell) => {
      cell.alignment = { horizontal: 'left', vertical: 'middle' };
    });
  });

  // Add borders to all cells
  sheet.eachRow((row) => {
    row.eachCell((cell) => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
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