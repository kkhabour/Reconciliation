# My Node.js Project

## Overview

This project is a Node.js application that processes data into a multi-tab Excel file using ES6 syntax. It is designed to be clean, maintainable, and easy to extend.

## Project Structure

The project is organized as follows:

```
my-node-project/
│
├── src/
│   ├── config/
│   │   └── index.js         # Loads configuration and environment variables via dotenv
│   ├── utils/
│   │   ├── excelGenerator.js # Generates Excel files with a formatted "Summary" tab and dynamic tabs
│   │   └── logger.js         # Logger setup using winston for colorful logging output
│   └── index.js             # Main entry point of the application
│
├── .env.example             # Example environment file for required variables
├── .gitignore               # Files and directories to be ignored by Git
├── babel.config.json        # Babel configuration for transpiling modern JS code
├── package.json             # Project metadata, scripts, and dependency definitions
└── README.md                # Project documentation and usage instructions
```

## Dependencies

- **exceljs:** For generating Excel files.
- **winston:** For logging with colors and structured messages.
- **dotenv:** For loading environment configurations via a `.env` file.
- **@babel/cli, @babel/core, @babel/preset-env:** For transpiling ES6+ code (development only).

## Configuration

The project supports configuration through the `src/config/index.js` file. Environment variables are loaded from a **.env** file in the project root.

Create a `.env` file with contents similar to:

```env
API_URL=https://api.example.com/data
EXCEL_FILE_PATH=data.xlsx
```

Any values provided in the **.env** file will override the default values.

## Excel Generator Module

This project includes an Excel generator utility that can create a formatted "Summary" tab as well as dynamic additional tabs.

### Features:
- **Summary Tab:** Contains metrics (such as Report Date, Total Records Processed) with enhanced formatting (headings, borders, fill colors).
- **Dynamic Tabs:** Create new worksheet tabs dynamically by specifying the sheet name, headers, and data. New tabs follow the same styling rules.

### Functions:

- `generateSummarySheet(workbook)`
  - **Parameters:** 
    - `workbook` (ExcelJS.Workbook): The workbook instance.
  - **Description:** Creates the "Summary" tab with custom headers and sample metrics.

- `addDynamicSheet(workbook, sheetName, headers, dataRows)`
  - **Parameters:** 
    - `workbook` (ExcelJS.Workbook): The workbook instance.
    - `sheetName` (string): Desired name for the tab.
    - `headers` (Array<string>): Array of header titles.
    - `dataRows` (Array<Array<any>>): Array of rows (each row is an array of data).
  - **Description:** Adds a new sheet with provided headers and rows, applying consistent styling.

- `generateExcelFile(filePath, dynamicSheets)`
  - **Parameters:**
    - `filePath` (string): Output file path for the generated Excel file.
    - `dynamicSheets` (Array<Object>): Array of sheet configuration objects { sheetName, headers, data }.
  - **Usage Example:**

```javascript
import { generateExcelFile } from './utils/excelGenerator.js';

async function runExample() {
  const dynamicSheets = [
    {
      sheetName: 'Sales Data',
      headers: ['Date', 'Region', 'Sales'],
      data: [
        ['2023-01-01', 'North', 1234],
        ['2023-01-02', 'South', 2345]
      ]
    }
  ];

  await generateExcelFile('output.xlsx', dynamicSheets);
}

runExample();
```

### Installation:
1. Ensure you have Node.js (latest stable version) installed.
2. Install dependencies with **pnpm**:
   ```bash
   pnpm install
   ```
3. Run the application using:
   ```bash
   pnpm start
   ```

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your improvements.

## Contact

For any questions or issues, please contact [Your Name](mailto:your.email@example.com).