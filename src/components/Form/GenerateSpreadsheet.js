import React, { useEffect } from 'react';
import * as XLSX from 'xlsx';

const GenerateSpreadsheet = ({ transactions, userName, onDownloadComplete }) => {

    useEffect(() => {
        const handleGenerateSpreadsheet = () => {
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

            const data = transactions.map((transaction) => [
                formatDate(transaction.date),
                transaction.timeIn ? new Date(transaction.timeIn).toLocaleTimeString() : '-',
                transaction.timeOut ? new Date(transaction.timeOut).toLocaleTimeString() : '-',
                transaction.totalLunchBreakTime || '-',
                transaction.totalBreakTime || '-',
                transaction.computedTotalTimeClock || '-',
                transaction.status,
            ]);

            const header = [
                'Date', 
                'Clock-In', 
                'Clock-Out', 
                'Lunch Break', 
                'Break Time', 
                'Working Hours', 
                'Status'
            ];

            // Add header to the data
            data.unshift(header);

            const worksheet = XLSX.utils.aoa_to_sheet(data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Shifts');

            // Create the file name using the custom date format
            const fileName = `${userName}_Shifts_${startDate}_to_${endDate}.xlsx`;

            XLSX.writeFile(workbook, fileName);

            // Notify parent component that the download is complete
            if (onDownloadComplete) {
                onDownloadComplete();
            }
        };

        handleGenerateSpreadsheet();
    }, [transactions, userName, onDownloadComplete]);

    return null; // The component doesn't render anything visible
};

export default GenerateSpreadsheet;
