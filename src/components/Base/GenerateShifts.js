// src/components/GenerateShifts.js
import React from 'react';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import 'jspdf-autotable';
import '../../assets/fonts/roboto.css';
import '../../assets/fonts/color.css';
import '../../assets/styles/LoginForm.css';
import '../../assets/styles/BizBuddy.css';
import { logoBase64 } from '../../hooks/logoBizBuddyBase64'; // Import the base64 string

const generateShiftPDF = (shifts, extractionDate, userEmail, userName) => {
  const doc = new jsPDF('l', 'mm', 'a4'); // Landscape mode

  doc.setFont('helvetica');
  doc.setFontSize(12);
  doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');
  doc.addFont('Roboto-Bold.ttf', 'Roboto', 'bold');
  doc.setFont('Roboto');

  // Add logo
  doc.addImage(logoBase64, 'PNG', 10, 10, 55, 20);

  // Add title
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text("Biz Buddy Shifts Report", 15, 40);

  // Add extraction details
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Date of Extraction: ${extractionDate}`, 15, 50);
//   doc.text(`Extracted by: ${userEmail}`, 15, 60);
doc.text(`Extracted by: Carlo Corcuera`, 15, 60);
doc.text(`Data for: ${userName}`, 15, 70);

  // Define table headers
  const headers = ["Date", "Clock-In", "Clock-Out", "Total Break Hours", "Total Lunch Hours", "Total Work Hours", "Status"];

  // Add table
  doc.autoTable({
    head: [headers],
    body: shifts.map(shift => [
      shift.date,
      shift.timeIn,
      shift.timeOut,
      shift.totalBreakTime,
      shift.totalLunchBreakTime,
      shift.totalShiftTime,
      shift.status
    ]),
    startY: 80,
    margin: { top: 60 }
  });

  // Save the PDF
  const today = new Date();
  const formattedDate = today.toISOString().slice(0, 10).replace(/-/g, '');
  const filename = `[ ${formattedDate} ] - BizBuddyShiftsReport.pdf`;
  doc.save(filename);
};

const generateShiftSpreadsheet = (shifts, extractionDate, userEmail, userName) => {
  const headers = ["Date", "Clock-In", "Clock-Out", "Total Break Hours", "Total Lunch Hours", "Total Work Hours", "Status"];
  const data = shifts.map(shift => [
    shift.date,
    shift.timeIn,
    shift.timeOut,
    shift.totalBreakTime,
    shift.totalLunchBreakTime,
    shift.totalShiftTime,
    shift.status
  ]);

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet([]);

  ws['A1'] = { v: 'BizBuddy', s: { font: { sz: 16, bold: true }, alignment: { horizontal: 'center', vertical: 'center' }, fill: { fgColor: { rgb: 'FFFF00' } } }};
  ws['A2'] = { v: `Biz Buddy Shifts Report`, s: { font: { sz: 14, bold: true }, alignment: { horizontal: 'center', vertical: 'center' } }};
  ws['A3'] = { v: `Date of Extraction: ${extractionDate}`, s: { font: { sz: 12 }, alignment: { horizontal: 'center', vertical: 'center' } }};
  ws['A4'] = { v: `Extracted by: ${userEmail}`, s: { font: { sz: 12 }, alignment: { horizontal: 'center', vertical: 'center' } }};
  ws['A5'] = { v: `Data for: ${userName}`, s: { font: { sz: 12 }, alignment: { horizontal: 'center', vertical: 'center' } }};

  ws['!merges'] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: headers.length - 1 } },
    { s: { r: 1, c: 0 }, e: { r: 1, c: headers.length - 1 } },
    { s: { r: 2, c: 0 }, e: { r: 2, c: headers.length - 1 } },
    { s: { r: 3, c: 0 }, e: { r: 3, c: headers.length - 1 } }
  ];

  XLSX.utils.sheet_add_aoa(ws, [headers, ...data], { origin: 'A5' });

  const maxColumnWidths = headers.map((header, i) => Math.max(
    header.length,
    ...data.map(row => (row[i] || '').toString().length)
  ));

  ws['!cols'] = maxColumnWidths.map(width => ({ width: width + 2 }));

  XLSX.utils.book_append_sheet(wb, ws, "Shifts");

  const today = new Date();
  const formattedDate = today.toISOString().slice(0, 10).replace(/-/g, '');
  const filename = `[ ${formattedDate} ] - BizBuddyShiftsReport.xlsx`;

  XLSX.writeFile(wb, filename);
};

export default function GenerateShifts({ shifts, extractionDate, userEmail, selected }) {

    return (
    <div className='bottom-right'>
      <p className='roboto-regular'>
        <span
          className='pdf'
          onClick={() => generateShiftPDF(shifts, extractionDate, userEmail, selected)}
          style={{ cursor: 'pointer' }}
        >
          Generate Shift PDF
        </span>
        <span> | </span>
        <span
          className='spreadsheet'
          onClick={() => generateShiftSpreadsheet(shifts, extractionDate, userEmail, selected)}
          style={{ cursor: 'pointer' }}
        >
          Generate Shift Spreadsheet
        </span>
      </p>
    </div>
  );
}
