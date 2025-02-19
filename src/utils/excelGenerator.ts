import ExcelJS from 'exceljs';

/**
 * Generates the "Summary" worksheet with enhanced formatting.
 * The sheet includes:
 * - A merged title row ("FinaMaze Client Assets Reconciliation")
 * - Reconciliation Date and Execution Date rows
 * - A header for metrics, followed by key metric rows
 *
 * @param workbook - The ExcelJS workbook instance
 */
export function generateSummarySheet(workbook: ExcelJS.Workbook): void {
  const summarySheet = workbook.addWorksheet('Summary');

  // Setup two main columns with specified widths.
  summarySheet.columns = [
    { header: "", key: "col1", width: 40 },
    { header: "", key: "col2", width: 25 },
  ];

  // Title row: merged across columns A and B.
  const titleRow = summarySheet.addRow(["FinaMaze Client Assets Reconciliation"]);
  summarySheet.mergeCells(`A${titleRow.number}:B${titleRow.number}`);
  titleRow.font = { size: 16, bold: true };
  titleRow.alignment = { horizontal: 'center', vertical: 'middle' };

  // Add a blank row for spacing.
  summarySheet.addRow([]);

  // Row for Reconciliation Date.
  const recDate: Date = new Date();
  const recRow = summarySheet.addRow(["Reconciliation Date:", recDate.toLocaleDateString()]);
  recRow.eachCell((cell) => {
    cell.font = { bold: true };
    cell.alignment = { horizontal: 'left', vertical: 'middle' };
  });

  // Row for Execution Date.
  const execDate: Date = new Date();
  const execRow = summarySheet.addRow(["Execution Date:", execDate.toLocaleDateString()]);
  execRow.eachCell((cell) => {
    cell.font = { bold: true };
    cell.alignment = { horizontal: 'left', vertical: 'middle' };
  });

  // Add a blank row to separate dates from metrics.
  summarySheet.addRow([]);

  // Header row for metrics.
  const headerRow = summarySheet.addRow(["Metric", "Value"]);
  headerRow.eachCell((cell) => {
    cell.font = { bold: true };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF4472C4' } // Blue shade
    };
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
    cell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };
  });

  // Define key metrics.
  const metrics = [
    { metric: "Number of Securities Held by Customers", value: 88 },
    { metric: "Number of Securities Held by Brokers", value: 87 },
    { metric: "Difference in Number of Securities", value: 1 },
    { metric: "Number of Securities with Matching Quantities", value: 82 },
    { metric: "Number of Securities with Position Breaks", value: 6 },
    { metric: "Number of Clients with Position Breaks", value: 11 },
  ];

  // Populate metric rows with borders and left alignment.
  metrics.forEach(item => {
    const row = summarySheet.addRow([item.metric, item.value]);
    row.eachCell((cell) => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
      cell.alignment = { horizontal: 'left', vertical: 'middle' };
    });
  });
}

/**
 * Adds a new worksheet (tab) with dynamic data and consistent styling.
 *
 * @param workbook - The ExcelJS workbook instance.
 * @param sheetName - The desired name for the new worksheet.
 * @param headers - An array of header strings.
 * @param dataRows - An array of rows, where each row is an array of values.
 */
export function addDynamicSheet(
  workbook: ExcelJS.Workbook,
  sheetName: string,
  headers: string[],
  dataRows: any[][]
): void {
  const newSheet = workbook.addWorksheet(sheetName);

  // Set columns using the headers.
  newSheet.columns = headers.map(header => ({
    header,
    key: header.toLowerCase().replace(/ /g, '_'),
    width: 20
  }));

  // Style header row.
  newSheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4472C4' } };
    cell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };
  });

  // Populate rows.
  dataRows.forEach(rowData => {
    const row = newSheet.addRow(rowData);
    row.eachCell((cell) => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
      cell.alignment = { horizontal: 'left', vertical: 'middle' };
    });
  });
}

/**
 * Generates an Excel file with a formatted Summary tab and dynamic tabs.
 *
 * @param filePath - The output file path for the Excel file.
 * @param dynamicSheets - Array of sheet configuration objects, each with properties:
 *   - sheetName: string
 *   - headers: string[]
 *   - data: any[][]
 */
export async function generateExcelFile(
  filePath: string,
  dynamicSheets: { sheetName: string; headers: string[]; data: any[][] }[] = []
): Promise<void> {
  const workbook = new ExcelJS.Workbook();

  // Create the Summary tab.
  generateSummarySheet(workbook);

  // Add additional dynamic sheets.
  dynamicSheets.forEach(sheet => {
    addDynamicSheet(workbook, sheet.sheetName, sheet.headers, sheet.data);
  });

  await workbook.xlsx.writeFile(filePath);
  console.log(`Excel file created successfully at ${filePath}`);
} 