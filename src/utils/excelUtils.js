import ExcelJS from 'exceljs';

export async function generateExcel(data, filePath) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Data');

  worksheet.columns = [
    { header: 'ID', key: 'id', width: 10 },
    { header: 'Name', key: 'name', width: 30 },
    { header: 'Value', key: 'value', width: 15 },
  ];

  data.forEach(item => {
    worksheet.addRow({
      id: item.id,
      name: item.name,
      value: item.value,
    });
  });

  await workbook.xlsx.writeFile(filePath);
  console.log('Excel file created successfully at', filePath);
} 