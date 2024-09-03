import React, { useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const GeneratePDF = ({ transactions, userName, onDownloadComplete }) => {

    useEffect(() => {
        const handleGeneratePDF = () => {
            if (transactions.length === 0) return;

            // Function to format date in M-D-YY format
            const formatDate = (date) => {
                const d = new Date(date);
                const month = d.getMonth() + 1;
                const day = d.getDate();
                const year = d.getFullYear().toString().slice(-2);
                return `${month}-${day}-${year}`;
            };

            const startDate = formatDate(transactions[0].date);
            const endDate = formatDate(transactions[transactions.length - 1].date);

            // Initialize jsPDF
            const doc = new jsPDF();

            // Set title and document metadata
            doc.text(`${userName}'s Shift Report`, 14, 22);

            // Create table data
            const tableData = transactions.map((transaction) => [
                formatDate(transaction.date),
                transaction.timeIn ? new Date(transaction.timeIn).toLocaleTimeString() : '-',
                transaction.timeOut ? new Date(transaction.timeOut).toLocaleTimeString() : '-',
                transaction.totalLunchBreakTime || '-',
                transaction.totalBreakTime || '-',
                transaction.computedTotalTimeClock || '-',
                transaction.status,
            ]);

            // Define table columns
            const headers = [
                'Date', 
                'Clock-In', 
                'Clock-Out', 
                'Lunch Break', 
                'Break Time', 
                'Working Hours', 
                'Status'
            ];

            // Add table to the PDF
            doc.autoTable({
                head: [headers],
                body: tableData,
                startY: 30,
            });

            // Create the file name using the custom date format
            const fileName = `${userName}_Shifts_${startDate}_to_${endDate}.pdf`;

            // Save the PDF
            doc.save(fileName);

            // Notify parent component that the download is complete
            if (onDownloadComplete) {
                onDownloadComplete();
            }
        };

        handleGeneratePDF();
    }, [transactions, userName, onDownloadComplete]);

    return null; // The component doesn't render anything visible
};

export default GeneratePDF;
