# My Node.js Project

## Overview

This project is a Node.js application that fetches data from an API and processes it into an Excel file using ES6 syntax. It is designed to be clean, maintainable, and easy to extend.

## Project Structure

The project is organized as follows:

The project is organized into the following directories and files:

## Dependencies

- **axios:** For making HTTP requests.
- **exceljs:** For generating Excel files.
- **winston:** For logging with colors and structured messages.
- **@babel/cli, @babel/core, @babel/preset-env:** For transpiling ES6+ code (development only).

## Configuration

The project supports configuration through the `src/config/index.js` file. Environment variables can be loaded from a **.env** file in the project root.

Create a `.env` file with contents similar to:

```env
API_URL=https://api.example.com/data
EXCEL_FILE_PATH=data.xlsx
```

Any values provided in the **.env** file will override the default values.