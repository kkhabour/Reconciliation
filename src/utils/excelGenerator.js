import ExcelJS from 'exceljs';

/**
 * Generates the "Summary" worksheet with enhanced formatting.
 * The sheet includes:
 * - A merged title row ("FinaMaze Client Assets Reconciliation")
 * - Reconciliation Date and Execution Date rows
 * - A header for metrics, followed by key metric rows
 *
 * @param {ExcelJS.Workbook} workbook - The workbook to which the Summary sheet will be added.
 */
export function generateSummarySheet(workbook) {
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
  const recDate = new Date();
  const recRow = summarySheet.addRow(["Reconciliation Date:", recDate.toLocaleDateString()]);
  recRow.eachCell((cell) => {
    cell.font = { bold: true };
    cell.alignment = { horizontal: 'left', vertical: 'middle' };
  });

  // Row for Execution Date.
  const execDate = new Date();
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
 * @param {ExcelJS.Workbook} workbook - The workbook instance.
 * @param {string} sheetName - The name of the new worksheet.
 * @param {Array<string>} headers - An array of header strings.
 * @param {Array<Array<any>>} dataRows - An array of rows, where each row is an array of values.
 */
export function addDynamicSheet(workbook, sheetName, headers, dataRows) {
  const newSheet = workbook.addWorksheet(sheetName);

  // Setup columns based on headers (keys generated from header text).
  newSheet.columns = headers.map(header => ({
    header,
    key: header.toLowerCase().replace(/ /g, '_'),
    width: 20
  }));

  // Style the header row with a blue background and white bold text.
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

  // Add each data row with consistent borders and alignment.
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
 * Generates an Excel file including a formatted Summary tab and dynamic tabs.
 *
 * @param {string} filePath - The output file path for the generated Excel file.
 * @param {Array<Object>} dynamicSheets - Array of sheet configuration objects. Each object must include:
 *    - sheetName: {string} The name of the worksheet.
 *    - headers: {Array<string>} Array of header strings.
 *    - data: {Array<Array<any>>} Array of data rows.
 *
 * @example
 * const dynamicSheets = [{
 *   sheetName: 'Sales Data',
 *   headers: ['Date', 'Region', 'Sales'],
 *   data: [
 *     ['2023-01-01', 'North', 1234],
 *     ['2023-01-02', 'South', 2345],
 *   ]
 * }];
 * await generateExcelFile('output.xlsx', dynamicSheets);
 */
export async function generateExcelFile(filePath, dynamicSheets = []) {
  const workbook = new ExcelJS.Workbook();

  // Create the Summary tab with enhanced formatting.
  generateSummarySheet(workbook);

  // Add additional dynamic sheets.
  dynamicSheets.forEach(sheet => {
    addDynamicSheet(workbook, sheet.sheetName, sheet.headers, sheet.data);
  });

  // Write the workbook to the specified file path.
  await workbook.xlsx.writeFile(filePath);
  console.log(`Excel file created successfully at ${filePath}`);
} 