import React from 'react';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import 'jspdf-autotable';
import '../../assets/fonts/roboto.css';
import '../../assets/fonts/color.css';
import '../../assets/styles/LoginForm.css';
import '../../assets/styles/BizBuddy.css';

import { logoBase64 } from '../../hooks/logoBizBuddyBase64';

const generatePDF = (accounts, extractionDate, userEmail) => {
  // Initialize jsPDF in landscape mode
  const doc = new jsPDF('l', 'mm', 'a4'); // 'l' for landscape, 'mm' for millimeters, 'a4' for paper size

  doc.setFont('helvetica');
  doc.setFontSize(12); // Set default font size
  doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');
  doc.addFont('Roboto-Bold.ttf', 'Roboto', 'bold');
  doc.setFont('Roboto');

  // Add logo
  doc.addImage(logoBase64, 'PNG', 10, 10, 55, 20); // Adjust position and size as needed

  // Add title
  doc.setFontSize(16); // Increase font size for the title
  doc.setFont('helvetica', 'bold'); // Use bold font for the title
  doc.text("Biz Buddy Users Report", 15, 40);

  // Add date of extraction
  doc.setFontSize(12); // Reset font size
  doc.setFont('helvetica', 'normal'); // Use normal font style
  doc.text(`Date of Extraction: ${extractionDate}`, 15, 50);

  // Add extractor's email
  doc.text(`Extracted by: ${userEmail}`, 15, 60);

  // Define table headers
  const headers = ["Name", "Email", "Birthday", "Team Role", "Team Name", "SV", "Last Login"];

  // Add table
  doc.autoTable({
    head: [headers],
    body: accounts.map(account => [
      `${account.firstName} ${account.lastName}`,
      account.email,
      account.birthday,
      account.teamRole,
      account.teamName,
      account.isSv ? 'Yes' : 'No',
      account.loginDetails.length > 0 
        ? new Date(account.loginDetails[account.loginDetails.length - 1].timeDateDetails).toLocaleString() 
        : "-"
    ]),
    startY: 70, // Adjust to avoid overlap with the previous content
    margin: { top: 60 } // Adjust margin if necessary
  });

  // Format the filename with the date in YYYYMMDD format
  const today = new Date();
  const formattedDate = today.toISOString().slice(0, 10).replace(/-/g, '');
  const filename = `[ ${formattedDate} ] - BizBuddyUsersReport.pdf`;

  // Save the PDF
  doc.save(filename);
};


const generateSpreadsheet = (accounts, extractionDate, userEmail) => {
  const headers = [
    "Name", "Email", "Birthday", "Active", "Admin", "Agent", "SV", "SysAd", "ID", "Last Login"
  ];
  const data = accounts.map(account => [
    `${account.firstName} ${account.lastName}`,
    account.email,
    account.birthday,
    account.isActive ? 'Yes' : 'No',
    account.isAdmin ? 'Yes' : 'No',
    account.isAgent ? 'Yes' : 'No',
    account.isSV ? 'Yes' : 'No',
    account.isSysAd ? 'Yes' : 'No',
    account._id,
    account.loginDetails.length > 0 
      ? new Date(account.loginDetails[account.loginDetails.length - 1].timeDateDetails).toLocaleString() 
      : "-"
  ]);

  // Create a new workbook and worksheet
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet([]);

  // Merge cells and add text
  ws['A1'] = { v: 'BizBuddy', s: { 
    font: { sz: 16, bold: true },
    alignment: { horizontal: 'center', vertical: 'center' },
    fill: { fgColor: { rgb: 'FFFF00' } } // Optional: Set background color
  }};
  ws['A2'] = { v: `Biz Buddy Users Report`, s: { 
    font: { sz: 14, bold: true },
    alignment: { horizontal: 'center', vertical: 'center' }
  }};
  ws['A3'] = { v: `Date of Extraction: ${extractionDate}`, s: { 
    font: { sz: 12 },
    alignment: { horizontal: 'center', vertical: 'center' }
  }};
  ws['A4'] = { v: `Extracted by: ${userEmail}`, s: { 
    font: { sz: 12 },
    alignment: { horizontal: 'center', vertical: 'center' }
  }};

  // Merge cells for the title rows
  ws['!merges'] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: headers.length - 1 } }, // Merge A1 to last column
    { s: { r: 1, c: 0 }, e: { r: 1, c: headers.length - 1 } }, // Merge A2 to last column
    { s: { r: 2, c: 0 }, e: { r: 2, c: headers.length - 1 } }, // Merge A3 to last column
    { s: { r: 3, c: 0 }, e: { r: 3, c: headers.length - 1 } }  // Merge A4 to last column
  ];

  // Add headers and data
  XLSX.utils.sheet_add_aoa(ws, [headers, ...data], { origin: 'A5' });

  // Adjust column widths based on content
  const maxColumnWidths = headers.map((header, i) => Math.max(
    header.length, // Header length
    ...data.map(row => (row[i] || '').toString().length) // Data length
  ));
  
  ws['!cols'] = maxColumnWidths.map(width => ({ width: width + 2 })); // Add padding to the width

  XLSX.utils.book_append_sheet(wb, ws, "Users");

  // Format the filename with the date in YYYYMMDD format
  const today = new Date();
  const formattedDate = today.toISOString().slice(0, 10).replace(/-/g, '');
  const filename = `[ ${formattedDate} ] - BizBuddyUsersReport.xlsx`;

  // Save the file
  XLSX.writeFile(wb, filename);
};


export default function Generate({ accounts, extractionDate, userEmail }) {
  return (
    <div className='bottom-right'>
      <p className='roboto-regular'>
        <span
          className='pdf'
          onClick={() => generatePDF(accounts, extractionDate, userEmail)}
          style={{ cursor: 'pointer' }}
        >
          Generate PDF
        </span>
        <span> | </span>
        <span
          className='spreadsheet'
          onClick={() => generateSpreadsheet(accounts, extractionDate, userEmail)}
          style={{ cursor: 'pointer' }}
        >
          Generate Spreadsheet
        </span>
      </p>
    </div>
  );
};
